import ymaps, { IClassConstructor, ILayout } from "yandex-maps";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type MapType = ymaps.Map;

export type CoordinatesType = number[];

export interface IPlacemark {
  name: string;
  hint: string;
  coordinate: CoordinatesType;
}

export type TemplateType = IClassConstructor<ILayout>;

export type MutableRefType<T> = MutableRefObject<T | undefined>;

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
