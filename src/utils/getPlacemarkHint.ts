import { YMapsApi } from "react-yandex-maps";

export function getPlacemarkHint(pointInfo: YMapsApi): string {
  return (
    [
      pointInfo.getThoroughfare(),
      pointInfo.getPremise(),
      pointInfo.getPremiseNumber(),
    ]
      .filter(Boolean)
      .join(", ") || pointInfo.getAddressLine()
  );
}
