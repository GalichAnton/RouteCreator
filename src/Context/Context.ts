import { RefObject, createContext } from "react";
import { YMapsApi } from "react-yandex-maps";
import {
  IPlacemark,
  MapType,
  MutableRefType,
  SetStateType,
} from "../types/types";

export interface IContext {
  apiRef: MutableRefType<YMapsApi>;
  mapRef: MutableRefType<MapType>;
  inputRef: RefObject<HTMLInputElement>;
  placemarks: IPlacemark[];
  setPlacemarks?: SetStateType<IPlacemark[]>;
  warning: string;
  setWarning?: SetStateType<string>;
}

export const defaultContextValue = {
  apiRef: { current: undefined },
  mapRef: { current: undefined },
  inputRef: { current: null },
  placemarks: [],
  warning: "",
};

const Context = createContext<IContext>(defaultContextValue);

export default Context;
