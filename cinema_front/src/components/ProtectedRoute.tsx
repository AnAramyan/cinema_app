import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default memo(ProtectedRoute);
