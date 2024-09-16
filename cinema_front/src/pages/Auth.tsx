import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
const Auth: FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Welcome to Cinema App</h1>
        <p className="mb-6 text-lg">Please login or register to continue</p>

        <div className="flex space-x-4">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/register">
            <Button color="light">Register</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default memo(Auth);
