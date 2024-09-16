import { FC, memo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextInput } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { registerValidationSchema } from "../schemas/registerValidationSchema";
import { registerUser } from "../api/authAPI";
import { IUser } from "../types";

const RegisterForm: FC = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: IUser,
    { setErrors }: FormikHelpers<IUser>
  ) => {
    const resultAction = await dispatch(registerUser(values));
    if (!registerUser.rejected.match(resultAction)) {
      navigate("/login");
    } else if (registerUser.rejected.match(resultAction)) {
      const apiErrors = resultAction.payload as { [key: string]: string[] };
      setErrors(
        Object.keys(apiErrors).reduce((acc, key) => {
          acc[key] = apiErrors[key].join(", ");
          return acc;
        }, {} as { [key: string]: string })
      );
    }
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "", password2: "" }}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <Field name="username">
              {({ field }: any) => (
                <TextInput
                  id="username"
                  {...field}
                  type="text"
                  placeholder="Username"
                  className="mt-1"
                />
              )}
            </Field>
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Field name="email">
              {({ field }: any) => (
                <TextInput
                  id="email"
                  {...field}
                  type="email"
                  placeholder="Email"
                  className="mt-1"
                />
              )}
            </Field>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Field name="password">
              {({ field }: any) => (
                <TextInput
                  id="password"
                  {...field}
                  type="password"
                  placeholder="Password"
                  className="mt-1"
                />
              )}
            </Field>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <Field name="password2">
              {({ field }: any) => (
                <TextInput
                  id="password2"
                  {...field}
                  type="password"
                  placeholder="Confirm Password"
                  className="mt-1"
                />
              )}
            </Field>
            <ErrorMessage
              name="password2"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Registering..." : "Register"}
          </Button>
          <div className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default memo(RegisterForm);
