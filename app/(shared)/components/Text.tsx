import React, { ComponentProps } from "react";
import {
  TEXT_COLORS,
  TEXT_SIZES,
  TEXT_WEIGHTS,
} from "@/app/(shared)/constants/theme";

type Props = ComponentProps<"span"> & {
  themeColor: keyof typeof TEXT_COLORS;
  themeSize: keyof typeof TEXT_SIZES;
  themeWeight: keyof typeof TEXT_WEIGHTS;
};

const Text = ({
  children,
  className,
  themeColor,
  themeSize,
  themeWeight,
  ...rest
}: Props) => {
  return (
    <span
      className={`${TEXT_COLORS[themeColor]} ${TEXT_SIZES[themeSize]} ${TEXT_WEIGHTS[themeWeight]} ${className} `}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Text;
