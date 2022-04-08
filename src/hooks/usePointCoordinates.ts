import { geometry, geoObject } from "yandex-maps";
import { useCallback, useContext, useEffect } from "react";
import Context from "../Context/Context";
import { YMapsApi } from "react-yandex-maps";
import { CoordinatesType } from "../types/types";
import { getPlacemarkHint } from "../utils/getPlacemarkHint";

type TGeoCodeResult = { geoObjects: geoObject.Sequence };

type TGetPointInfo = (value: string | CoordinatesType) => Promise<{
  name: string;
  hint: string;
  coordinate: CoordinatesType;
} | void>;

type TAddRoutePoint = (name: string) => void;

type TRemoveRoutePoint = (index: number) => void;

type TUsePointCoordinates = () => {
  getPointInfo: TGetPointInfo;
  addRoutePoint: TAddRoutePoint;
  removeRoutePoint: TRemoveRoutePoint;
};

const usePointCoordinates: TUsePointCoordinates = () => {
  const { apiRef, mapRef, placemarks, setPlacemarks, setWarning } =
    useContext(Context);

  useEffect(() => {
    const api = apiRef.current;
    const map = mapRef.current;
    if (!api || !map || !placemarks.length) return;

    const bounds = map.geoObjects.getBounds();
    if (bounds) {
      map.setBounds(bounds, {
        checkZoomRange: true,
        useMapMargin: true,
        zoomMargin: [10, 20],
      });
    }
  }, [placemarks, apiRef, mapRef]);

  const getPointInfo: TGetPointInfo = useCallback(
    async (value) => {
      if (!apiRef.current) return;
      const result: TGeoCodeResult = await apiRef.current.geocode(value);
      const pointInfo: YMapsApi = result.geoObjects.get(0);
      if (!pointInfo) {
        return setWarning?.("Запрашиваемый объект не найден");
      }
      const address = pointInfo.getAddressLine();
      const point = pointInfo.geometry as geometry.Point;
      const coordinate = point.getCoordinates();
      if (coordinate) {
        return {
          name: address,
          hint: getPlacemarkHint(pointInfo),
          coordinate,
        };
      }
    },
    [apiRef, setWarning]
  );

  const addRoutePoint: TAddRoutePoint = useCallback(
    async (pointName) => {
      const api = apiRef.current;
      const map = mapRef.current;
      if (!api || !map) return;

      const pointInfo = await getPointInfo(pointName);
      if (pointInfo) {
        const { name, hint, coordinate } = pointInfo;
        setPlacemarks?.((prevPlacemarks) => {
          const lastPlacemark = prevPlacemarks[prevPlacemarks.length - 1];
          const isDuplicate =
            lastPlacemark &&
            (lastPlacemark.name === name ||
              lastPlacemark.coordinate.toString() === coordinate.toString());
          return isDuplicate
            ? prevPlacemarks
            : [
                ...prevPlacemarks,
                {
                  name,
                  hint,
                  coordinate,
                },
              ];
        });
      }
    },
    [apiRef, mapRef, setPlacemarks, getPointInfo]
  );

  const removeRoutePoint: TRemoveRoutePoint = useCallback(
    (deletedPointIndex) => {
      setPlacemarks?.((prevPlacemarks) =>
        prevPlacemarks.filter((_, i) => i !== deletedPointIndex)
      );
    },
    [setPlacemarks]
  );

  return { getPointInfo, addRoutePoint, removeRoutePoint };
};

export default usePointCoordinates;
