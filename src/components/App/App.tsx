import React, { useRef, useState } from "react";
import classes from "./App.module.scss";
import { YMapsApi } from "react-yandex-maps";
import { IPlacemark, MapType } from "../../types/types";
import Context from "../../Context/Context";
import Sidebar from "../SideBar/SideBar";
import MapWrapper from "../Map/Map";
const App: React.FC = () => {
  const apiRef = useRef<YMapsApi>();
  const mapRef = useRef<MapType>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [placemarks, setPlacemarks] = useState<IPlacemark[]>([]);
  const [warning, setWarning] = useState<string>("");

  return (
    <Context.Provider
      value={{
        apiRef,
        mapRef,
        inputRef,
        placemarks,
        setPlacemarks,
        warning,
        setWarning,
      }}
    >
      <div className={classes.app}>
        <Sidebar className={classes.app__sidebar} />
        <MapWrapper className={classes.app__map} />
      </div>
    </Context.Provider>
  );
};

export default App;
