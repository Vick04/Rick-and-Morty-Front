"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/fields/Input";
import Text from "@/components/Text";
import Button from "@/components/Button";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (values: typeof initialValues) => {
    setError("");

    try {
      const success = await login(values);
      if (success) {
        router.push("/home");
      } else {
        setError(
          "Credenciales inválidas. Intenta con: admin@example.com / password123",
        );
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intenta nuevamente.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="space-y-4">
            <div>
              <Input label="Email" name="email" type="email" />
              {errors.email && touched.email ? (
                <Text themeColor="error" themeSize="small" themeWeight="bold">
                  {errors.email}
                </Text>
              ) : null}
            </div>

            <div>
              <Input label="Password" name="password" type="password" />
              {errors.password && touched.password ? (
                <Text themeColor="error" themeSize="small" themeWeight="bold">
                  {errors.password}
                </Text>
              ) : null}
            </div>

            {error && (
              <Text themeColor="error" themeSize="small" themeWeight="bold">
                {error}
              </Text>
            )}

            <div className="mt-6">
              <Button
                className="w-full"
                themeColor="green"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Ingresar"}
              </Button>
            </div>

            <div className="mt-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
              <Text
                themeSize="small"
                className="text-center"
                themeColor={"default"}
                themeWeight={"bold"}
              >
                <strong>Credenciales de prueba:</strong>
                <br />
                Email: admin@example.com
                <br />
                Password: password123
              </Text>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
