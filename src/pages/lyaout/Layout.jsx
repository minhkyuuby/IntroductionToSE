import React from "react";
import Sidebar from "./Sidebar";
import { Container } from "@mui/material";

// Pass the child props
export default function Layout({ children, page = "dashboard" }) {
  return (
    <div>
      <Sidebar/>

      {/* display the child prop */}
      {children}
    </div>
  );
}