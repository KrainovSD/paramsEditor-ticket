import {
  Model,
  Param,
  IVirtualParams,
} from "components/ParamsEditor/ParamsEditor";
import "./ModelView.scss";
import { useMemo } from "react";

interface IModelViewProps {
  model: Model;
  virtualModel: Model;
  params: Param[];
}
interface IFullVirtualModel extends IVirtualParams {
  changed: boolean;
}

export const ModelView: React.FC<IModelViewProps> = ({
  model,
  virtualModel,
  params,
}) => {
  const fullModel = useMemo(() => {
    const modelFull: IVirtualParams[] = [];
    for (const param of params) {
      const id = param.id;
      const index = model.paramValues.findIndex((item) => item.paramId === id);
      if (index === -1) continue;
      const paramValue = model.paramValues[index].value;
      modelFull.push({ id, name: param.name, value: paramValue });
    }
    return modelFull;
  }, [model]);
  const fullVirtualModel = useMemo(() => {
    const virtualModelFull: IFullVirtualModel[] = [];
    for (const param of params) {
      const id = param.id;
      let index = virtualModel.paramValues.findIndex(
        (item) => item.paramId === id
      );
      if (index === -1) continue;
      const paramVitrualValue = virtualModel.paramValues[index].value;

      let changed = false;
      index = model.paramValues.findIndex((item) => item.paramId === id);
      if (index !== -1) {
        const paramValue = model.paramValues[index].value;
        changed = paramVitrualValue === paramValue ? false : true;
      }

      virtualModelFull.push({
        id,
        name: param.name,
        value: paramVitrualValue,
        changed,
      });
    }
    return virtualModelFull;
  }, [virtualModel]);

  return (
    <div className="model-view">
      <div className="model-view__model">
        <h1 className="_title">Оригинальная модель</h1>
        {fullModel.map((item) => (
          <p className="_item" key={item.id}>
            {item.name} = {item.value}
          </p>
        ))}
      </div>
      <div className="model-view__model">
        <h1 className="_title">Новая модель</h1>
        {fullVirtualModel.map((item) => (
          <p
            className={`_item ${item.changed ? "_changed" : ""}`}
            key={item.id}
          >
            {item.name} = {item.value}
          </p>
        ))}
      </div>
    </div>
  );
};
