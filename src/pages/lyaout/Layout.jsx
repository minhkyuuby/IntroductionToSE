import React from "react";
import Sidebar from "./Sidebar";

// Pass the child props
export default function Layout({ children, page = "Dashboard" }) {
  return (
    <div>
      <Sidebar highlightedItem={page}/>

      {/* display the child prop */}
      {children}
    </div>
  );
}