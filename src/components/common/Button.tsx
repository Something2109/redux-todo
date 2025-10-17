import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const ButtonDefaultClass =
  "border-2 px-4 py-1 dark:border-white dark:hover:bg-white dark:hover:text-gray-800 not-disabled:cursor-pointer rounded-lg";

export default function Button({
  className,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  className = className
    ? ButtonDefaultClass.concat(" ", className)
    : ButtonDefaultClass;

  return <button className={className} {...props} />;
}
