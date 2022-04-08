import React, { useCallback, useContext } from "react";
import classes from "./RouteForm.module.scss";
import Context from "../../Context/Context";
import usePointCoordinates from "../../hooks/usePointCoordinates";
import useLocalStorage from "../../hooks/useLocalStorage";
import cn from "classnames";

const RouteForm: React.FC = () => {
  const { inputRef, placemarks, setPlacemarks } = useContext(Context);
  const { addRoutePoint } = usePointCoordinates();
  const { setToLocalStorage, getFromLocalStorage } = useLocalStorage();

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        const name = inputRef.current?.value;
        if (name) addRoutePoint(name.trim());
      }
    },
    [inputRef, addRoutePoint]
  );

  const handleSave = () => {
    setToLocalStorage("placemarks", placemarks);
  };
  const handleLoad = () => {
    const placemarks = getFromLocalStorage("placemarks");
    setPlacemarks && placemarks && setPlacemarks(placemarks);
  };

  return (
    <div className={classes.routeForm}>
      <button
        className={cn(classes.routeForm__button, classes.buttonLoad)}
        onClick={handleLoad}
      />
      <button
        className={cn(classes.routeForm__button, classes.buttonSave)}
        disabled={placemarks.length === 0}
        onClick={handleSave}
      />
      <input
        className={classes.routeForm__input}
        ref={inputRef}
        type="text"
        placeholder="Новая точка маршрута"
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default RouteForm;
