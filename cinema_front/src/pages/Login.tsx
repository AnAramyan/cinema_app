import { FC, memo } from "react";
import LoginForm from "../components/LoginForm";

const Login: FC = () => {
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
      </div>
    </>
  );
};

export default memo(Login);
