import React from "react";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

const Loading = () => {
  return (
    <ArrowPathIcon
      data-testid="spin-loading"
      className="size-16 animate-spin text-green-800 dark:text-green-400"
    />
  );
};

export default Loading;
