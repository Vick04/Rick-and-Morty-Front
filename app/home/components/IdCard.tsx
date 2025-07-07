import React, { memo } from "react";
import Button from "@/app/(shared)/components/Button";
import Text from "@/app/(shared)/components/Text";
import { Character } from "@/app/(shared)/types/Character";

const Row = ({ label, value }: { label: string; value: string }) => {
  return (
    <>
      <Text
        className="col-span-4"
        themeColor="default"
        themeSize="small"
        themeWeight="semiBold"
      >
        {label}
      </Text>
      <Text
        className="col-span-8"
        themeColor="default"
        themeSize="small"
        themeWeight="default"
      >
        {value}
      </Text>
    </>
  );
};

const IdCard = ({
  activate,
  activated = true,
  character,
}: {
  activate: (arg0: number, arg1: boolean) => void;
  activated: boolean;
  character: Character;
}) => {
  const { gender, id, image, name, origin, species, status, type } = character;

  return (
    <div
      className={`${!activated && "opacity-25"} grid grid-cols-12 gap-2 rounded-2xl border-2 border-neutral-500 bg-white p-4 dark:bg-neutral-300`}
    >
      <img className="col-span-12 text-center" src={image} />
      <Text
        className="col-span-12 text-center"
        themeColor="default"
        themeSize="default"
        themeWeight="bold"
      >
        {name}
      </Text>
      <Row label="Gender" value={gender}></Row>
      <Row label="Species" value={species}></Row>
      <Row label="Origin" value={origin.name}></Row>
      <Row label="Tipo" value={type}></Row>
      <Row label="Estado" value={status}></Row>
      <Button
        className="col-span-12"
        onClick={() => activate(id, !activated)}
        themeColor={activated ? "red" : "green"}
      >
        {activated ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
};

export default memo(IdCard);
