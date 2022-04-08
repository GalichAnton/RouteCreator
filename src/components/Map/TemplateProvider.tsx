import React, { useEffect, useState } from "react";
import { withYMaps, YMapsApi } from "react-yandex-maps";
import { TemplateType } from "../../types/types";
import classes from "./Map.module.scss";

interface ITemplateProviderProps {
  ymaps?: YMapsApi;
  children: ({ template }: { template: TemplateType }) => React.ReactElement;
}

const TemplateProvider: React.FC<ITemplateProviderProps> = ({
  ymaps,
  children,
}) => {
  const [template, setTemplate] = useState<TemplateType | null>(null);

  useEffect(() => {
    if (ymaps && !template) {
      setTemplate(() =>
        ymaps.templateLayoutFactory.createClass(
          "<div class={classes.balloon}>" +
            "<div class={classes.balloon__header}>$[properties.balloonContentHeader]</div>" +
            "<div class={classes.balloon__body}>$[properties.balloonContentBody]</div>" +
            "</div>"
        )
      );
    }
  }, [ymaps, template]);

  return children({ template: template as TemplateType });
};

const ConnectedTemplateProvider = withYMaps(TemplateProvider, true, [
  "templateLayoutFactory",
]);

export default ConnectedTemplateProvider;
