import React, { useCallback, useContext } from "react";
import { Placemark } from "react-yandex-maps";
import { MapEvent } from "yandex-maps";
import Context from "../../Context/Context";
import usePointCoordinates from "../../hooks/usePointCoordinates";
import { IPlacemark, TemplateType } from "../../types/types";
import marker from "../../assets/images/marker.svg";
interface IMapPointsProps {
  template: TemplateType;
}

const MapPoints: React.FC<IMapPointsProps> = ({ template }) => {
  const { placemarks, setPlacemarks } = useContext(Context);
  const { getPointInfo } = usePointCoordinates();

  const onDragEnd = useCallback(
    (index: number) => (e: MapEvent) => {
      if (!setPlacemarks) return;
      const coords = e.get("target").geometry.getCoordinates();
      getPointInfo(coords).then((pointInfo) => {
        if (pointInfo) {
          setPlacemarks((prevPlacemarks) => {
            const newPlacemarks = [...prevPlacemarks];
            newPlacemarks[index] = pointInfo;
            return newPlacemarks;
          });
        }
      });
    },
    [setPlacemarks, getPointInfo]
  );

  return (
    <>
      {placemarks.map(({ name, hint, coordinate }: IPlacemark, index) => {
        const order = index + 1;
        return (
          <Placemark
            key={order}
            geometry={coordinate}
            options={{
              draggable: true,
              zIndexDrag: 10,
              zIndexHover: 9,
              balloonContentLayout: template,
              iconLayout: "default#imageWithContent",
              iconImageHref: marker,
              iconImageSize: [32, 32],
              iconImageOffset: [-26, -47],
              iconContentOffset: [19, 9],
            }}
            properties={{
              iconContent: order,
              hintContent: hint,
              balloonContentHeader: `Точка №${order}`,
              balloonContentBody: name,
            }}
            onDragEnd={onDragEnd(index)}
          />
        );
      })}
    </>
  );
};

export default MapPoints;
