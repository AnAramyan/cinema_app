import { FC, memo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextInput, Alert } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginValidationSchema } from "../schemas/loginValidationSchema";
import { loginUser } from "../api/authAPI";

const LoginForm: FC = () => {
  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const resultAction = await dispatch(loginUser(values));

    if (!loginUser.rejected.match(resultAction)) {
      navigate("/home");
    }
  };
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidationSchema}
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
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
            {error && (
              <Alert color="failure" className="mt-4">
                {error}
              </Alert>
            )}
            <div className="mt-4 text-center">
              Don't have an account?
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default memo(LoginForm);
