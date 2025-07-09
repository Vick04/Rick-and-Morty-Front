import React from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import { PaginatedResponse } from "@/types";
import Button from "@/components/Button";
import Text from "@/components/Text";

const Paginator = ({
  data,
  currentPageNumber,
  moveToPage,
}: {
  data: PaginatedResponse<any>;
  currentPageNumber: string;
  moveToPage: (arg0: string) => void;
}) => {
  return (
    <div className="grid grid-cols-12 items-center">
      <Button
        className="col-start-5 col-end-6 w-max justify-self-end"
        disabled={!data?.info?.prev}
        onClick={() => moveToPage(data?.info?.prev)}
        themeColor={"blue"}
      >
        <ArrowLeftIcon className="size-4 text-white" />
      </Button>
      <Text
        className="col-start-6 col-end-7 text-center"
        themeColor={"amberGray"}
        themeSize={"default"}
        themeWeight={"bold"}
      >
        {currentPageNumber}
      </Text>
      <Button
        className="col-start-7 col-end-8 w-max"
        disabled={!data?.info?.next}
        onClick={() => moveToPage(data?.info?.next)}
        themeColor={"blue"}
      >
        <ArrowRightIcon className="size-4 text-white" />
      </Button>
    </div>
  );
};

export default Paginator;
