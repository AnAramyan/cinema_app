import { FC, memo } from "react";
import RegisterForm from "../components/RegisterForm";

const Register: FC = () => {
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <RegisterForm />
      </div>
    </>
  );
};

export default memo(Register);