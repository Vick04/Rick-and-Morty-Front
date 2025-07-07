"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Form, Formik, FormikHelpers } from "formik";

import { apiCharacter } from "@/app/home/routes";
import { usePagination } from "@/app/(shared)/hooks/usePagination";
import Paginator from "@/app/(shared)/components/Paginator";
import IdCard from "@/app/home/components/IdCard";
import { Character } from "@/app/(shared)/types/Character";
import Loading from "@/app/(shared)/components/Loading";
import ProtectedRoute from "@/app/(shared)/components/ProtectedRoute";
import Text from "@/app/(shared)/components/Text";
import Input from "@/app/(shared)/components/fields/Input";

const HomePage = () => {
  const [input, setInput] = useState("");

  const {
    currentPageNumber,
    data,
    isFetching,
    isLoading,
    moveToPage,
    refetch,
  } = usePagination<Character>("CharactersList", apiCharacter, { name: input });

  const [value, setValue] = useLocalStorage(
    "activatedCharacters",
    {} as { [key: number]: boolean },
  );

  const activateCharacter = useCallback(
    (id: number, value: boolean) => {
      setValue((prevValue) => ({
        ...prevValue,
        [id]: value,
      }));
    },
    [setValue],
  );

  const initialValues = { search: "" };

  const handleSubmit = useCallback((values: typeof initialValues) => {
    setInput(values.search);
  }, []);

  useEffect(() => {
    refetch();
  }, [input]);

  return (
    <ProtectedRoute>
      <section>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ submitForm }) => (
            <Form>
              <div className="space-y-4">
                <div className="mt-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                  <div>
                    <Input
                      onBlur={() => submitForm()}
                      label="Search"
                      name="search"
                      type="input"
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
      <section className="mb-6">
        {data && (
          <Paginator
            data={data}
            currentPageNumber={currentPageNumber}
            moveToPage={moveToPage}
          />
        )}
      </section>
      {isLoading || isFetching ? (
        <section className="grid grid-cols-1 justify-items-center align-middle">
          <Loading />
        </section>
      ) : (
        <section className="grid grid-cols-4 gap-3">
          {data?.results.map((character) => (
            <IdCard
              activate={activateCharacter}
              activated={value[character.id]}
              key={character.id}
              character={character}
            />
          ))}
        </section>
      )}
      <section className="mt-6">
        {data && (
          <Paginator
            data={data}
            currentPageNumber={currentPageNumber}
            moveToPage={moveToPage}
          />
        )}
      </section>
    </ProtectedRoute>
  );
};

export default HomePage;
