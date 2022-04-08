import React from "react";
import classes from "./SideBar.module.scss";
import cn from "classnames";
import RouteForm from "../RouteForm/RouteForm";
import RouteList from "../RouteList/RouteList";

const Sidebar: React.FC<{ className: string }> = ({ className }) => {
  return (
    <div className={cn(className, classes.sidebar)}>
      <RouteForm />
      <RouteList />
    </div>
  );
};

export default Sidebar;
