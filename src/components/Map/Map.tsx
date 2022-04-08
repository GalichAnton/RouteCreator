import React, { FC, useContext } from "react";
import { Map, Polyline, YMaps } from "react-yandex-maps";
import ConnectedTemplateProvider from "./TemplateProvider";
import Context, { IContext } from "../../Context/Context";
import useMapEvents from "../../hooks/useMapEvents";
import cn from "classnames";
import Points from "./Points";
import classes from "./Map.module.scss";
import { yandexKey } from "../../constants/constants";

const mapState = {
  center: [55.76, 37.64],
  zoom: 9,
  controls: ["fullscreenControl"],
  behaviors: ["drag", "scrollZoom"],
};

const MapWrapper: FC<{ className: string }> = ({ className }) => {
  const { placemarks } = useContext<IContext>(Context);
  const { onLoadMapApi, setMapRef } = useMapEvents();

  return (
    <div className={cn(className, classes.map)}>
      <YMaps
        query={{
          load: "package.full",
          apikey: yandexKey,
          lang: "ru_RU",
          mode: "debug",
        }}
      >
        <ConnectedTemplateProvider>
          {({ template }) => (
            <Map
              state={mapState}
              instanceRef={setMapRef}
              width="100%"
              height="100%"
              onLoad={onLoadMapApi}
              modules={["SuggestView", "multiRouter.MultiRoute", "geocode"]}
            >
              <Points template={template} />
              <Polyline
                geometry={placemarks.map((point) => point.coordinate)}
                options={{
                  strokeColor: "#000",
                  strokeWidth: 4,
                  strokeOpacity: 0.5,
                }}
              />
            </Map>
          )}
        </ConnectedTemplateProvider>
      </YMaps>
    </div>
  );
};

export default MapWrapper;
