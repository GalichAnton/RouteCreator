import React from "react";
import classes from "./RouteItem.module.scss";
interface IRouteItemProps {
  name: string;
  index: number;
  onRemovePoint: React.MouseEventHandler<HTMLSpanElement>;
}

const RouteItem: React.FC<IRouteItemProps> = ({
  name,
  index,
  onRemovePoint,
}) => {
  return (
    <div className={classes.item} data-index={index}>
      {name}
      <span
        className={classes.item__remove}
        title="Удалить"
        onClick={onRemovePoint}
      />
    </div>
  );
};

export default RouteItem;
