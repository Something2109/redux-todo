import { Component, type ChangeEvent, type ReactNode } from "react";
import { withTranslation } from "react-i18next";
import SimpleReactValidator from "simple-react-validator";
import Button from "../common/Button";

type Props = {
  onAdd: (title: string, description: string) => void;
  t: (key: string) => string;
};

type State = {
  title: string;
  description: string;
};

class BaseAddRow extends Component<Props, State> {
  validator: SimpleReactValidator;

  readonly InputStyle = "focus:outline-none";

  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };

    this.validator = new SimpleReactValidator({
      className: "text-red-600 dark:text-red-400",
      messages: {
        required: this.props.t("common.rule.required"),
        min: this.props.t("common.rule.min"),
      },
    });
  }

  setTitle = (evt: ChangeEvent<HTMLInputElement>) => {
    this.validator.hideMessages();
    this.setState({ title: evt.target.value });
  };

  setDescription = (evt: ChangeEvent<HTMLInputElement>) => {
    this.validator.hideMessages();
    this.setState({ description: evt.target.value });
  };

  onAdd = () => {
    if (this.validator.allValid()) {
      this.props.onAdd(this.state.title, this.state.description);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render(): ReactNode {
    return (
      <tr className="*:p-2">
        <td></td>
        <td>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="focus:outline-0"
              name={this.props.t("todo.input.title.name")}
              placeholder={this.props.t("todo.input.title.placeholder")}
              value={this.state.title}
              onChange={this.setTitle}
            />
            {this.validator.message(
              this.props.t("todo.input.title.name"),
              this.state.title,
              "required|min:5"
            )}
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="focus:outline-0"
              name={this.props.t("todo.input.description.name")}
              placeholder={this.props.t("todo.input.description.placeholder")}
              value={this.state.description}
              onChange={this.setDescription}
            />
            {this.validator.message(
              this.props.t("todo.input.description.name"),
              this.state.description,
              "required|min:5"
            )}
          </div>
        </td>
        <td>
          <Button type="button" onClick={this.onAdd}>
            {this.props.t("common.add")}
          </Button>
        </td>
      </tr>
    );
  }
}

const AddRowWithTranslation = withTranslation()(BaseAddRow);

export default AddRowWithTranslation;
