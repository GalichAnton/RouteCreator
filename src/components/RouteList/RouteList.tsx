import React, { useCallback, useContext } from "react";
import classes from "./RouteList.module.scss";
import usePointCoordinates from "../../hooks/usePointCoordinates";
import { IPlacemark } from "../../types/types";
import Context from "../../Context/Context";
import RouteItem from "./RouteItem/RouteItem";
import DragDropWrapper from "../DragAndDrop/DragDropWrapper";

const RouteList: React.FC = () => {
  const { placemarks, setPlacemarks } = useContext(Context);
  const { removeRoutePoint } = usePointCoordinates();

  const onRemovePoint: React.MouseEventHandler<HTMLSpanElement> = useCallback(
    ({ target }) => {
      const index = (target as HTMLSpanElement).parentElement?.dataset.index;
      if (index) removeRoutePoint(Number(index));
    },
    [removeRoutePoint]
  );

  return (
    <DragDropWrapper<IPlacemark>
      className={classes.route__list}
      items={placemarks}
      setItems={setPlacemarks}
      nodes={placemarks.map(({ name }: IPlacemark, i: number) => (
        <RouteItem
          key={name}
          name={name}
          index={i}
          onRemovePoint={onRemovePoint}
        />
      ))}
    />
  );
};

export default RouteList;
