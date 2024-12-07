import React from "react";
import AuthLayout from "@/layouts/auth-layout/AuthLayout";

interface AuthlayoutViewProps {
  children: React.ReactNode;
}

const AuthlayoutView = ({ children }: AuthlayoutViewProps) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default AuthlayoutView;
