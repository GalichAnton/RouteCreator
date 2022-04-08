import { YMapsApi } from "react-yandex-maps";
import { Ref, useCallback, useContext } from "react";
import { MapType } from "../types/types";
import Context from "../Context/Context";
import usePointCoordinates from "./usePointCoordinates";

type OnSuggestSelectType = (event: {
  get: (field: string) => { value: string };
}) => void;

type UseMapEventsType = () => {
  onLoadMapApi: (ymaps: YMapsApi) => void;
  setMapRef: (instance: Ref<MapType>) => void;
};

const useMapEvents: UseMapEventsType = () => {
  const { apiRef, mapRef, inputRef } = useContext(Context);
  const { addRoutePoint } = usePointCoordinates();

  const onSuggestSelect: OnSuggestSelectType = useCallback(
    (e) => {
      const name = e.get("item").value;
      addRoutePoint(name);
    },
    [addRoutePoint]
  );

  const onLoadMapApi = (ymaps: YMapsApi) => {
    apiRef.current = ymaps;
    const input = inputRef?.current;
    if (input) {
      const suggestView = new ymaps.SuggestView(input);
      suggestView.events.add("select", onSuggestSelect);
    }
  };

  const setMapRef = useCallback(
    (instance) => {
      mapRef.current = instance;
    },
    [mapRef]
  );

  return { onLoadMapApi, setMapRef };
};

export default useMapEvents;
