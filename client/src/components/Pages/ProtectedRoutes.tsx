import { getToken } from "@/lib/utils";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/Auth.Store";
import { useLocation } from "react-router-dom";
import { loginFn } from "@/store/Auth.slice";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({
  children,
  allowAuthenticated = false,
}: {
  children: React.ReactNode;
  allowAuthenticated?: boolean;
}) => {
  const { user, isloading } = useAppSelector((state) => state.auth);
  const token = getToken();
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) dispatch(loginFn(token));
      } catch (error) {}
    };
    if (token && !user?.username) fetchUser();
  }, []);
  if (isloading) return <div>Loading...</div>;
  if (allowAuthenticated) {
    if (!token || !user?.username)
      return <Navigate to={"/"} state={{ from: location }} replace />;
    else return children;
  } else {
    if (token && user?.username) {
      return <Navigate to={"/chat"} state={{ from: location }} replace />;
    } else return children;
  }
};

export default ProtectedRoutes;
