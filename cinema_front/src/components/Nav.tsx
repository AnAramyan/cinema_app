import { FC, memo, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";

const Nav: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <span className="text-xl font-semibold dark:text-white">
          Cinema App
        </span>
      </Navbar.Brand>
      <Navbar.Toggle onClick={toggleMenu} />
      <Navbar.Collapse>
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-transform transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-4 space-y-4">
            <Button onClick={toggleMenu} className="self-end text-white">
              <HiX size={24} />
            </Button>
            <Link
              to="/home"
              className="text-white text-lg"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </div>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/home"
            className="text-gray-700 dark:text-white hover:text-gray-900"
          >
            Home
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default memo(Nav);
