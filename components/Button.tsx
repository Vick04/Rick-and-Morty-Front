import { BUTTON_COLORS } from "@/constants/theme";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  themeColor: keyof typeof BUTTON_COLORS;
  loading?: boolean;
  children: React.ReactNode;
};

const Button = ({ children, className, themeColor, ...rest }: Props) => {
  return (
    <button
      className={`${BUTTON_COLORS[themeColor]} ${className} w-full rounded-3xl p-2 font-medium`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
