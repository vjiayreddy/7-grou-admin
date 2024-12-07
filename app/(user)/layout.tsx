import MainLayout from "@/layouts/main-layout/MainLayout";
import React, { Fragment } from "react";

interface UserMainlayoutProps {
  children: React.ReactNode;
}

const UserMainlayout = ({ children }: UserMainlayoutProps) => {
  return <Fragment>{children}</Fragment>;
};

export default UserMainlayout;
