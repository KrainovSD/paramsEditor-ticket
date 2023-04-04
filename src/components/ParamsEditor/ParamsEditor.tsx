import { ModelView } from "../../components/ModelView/ModelView";
import { Input } from "../../components/UI/Input/Input";
import "./ParamsEditor.scss";
import { useState, useEffect, useMemo } from "react";

export interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}
export interface Model {
  paramValues: ParamValue[];
}
interface Props {
  params: Param[];
  model: Model;
  setModel: (v: Model) => void;
}
export interface IVirtualParams {
  id: number;
  name: string;
  value: string;
}

export const ParamsEditor: React.FC<Props> = ({ params, model, setModel }) => {
  const [isVisibleModel, setIsVisibleModel] = useState(false);
  const getModel = () => {
    const value = isVisibleModel ? false : true;
    setIsVisibleModel(value);
  };
  const changeModels = () => {
    setModel({ ...model, paramValues: [...virtualModel.paramValues] });
  };

  const [virtualParams, setVirtualParams] = useState<IVirtualParams[]>([]);
  useEffect(() => {
    const paramsVirtual = [];
    for (const param of params) {
      const id = param.id;
      const index = model.paramValues.findIndex((item) => item.paramId === id);
      if (index === -1) continue;
      const paramValue = model.paramValues[index].value;
      paramsVirtual.push({ id, name: param.name, value: paramValue });
    }
    setVirtualParams([...paramsVirtual]);
  }, [params, model]);
  const changeVirtualParams = (id: number, value: string) => {
    const newVirtualParams = virtualParams.map((item) => {
      if (item.id === id) item.value = value;
      return item;
    });
    setVirtualParams([...newVirtualParams]);
  };
  const virtualModel: Model = useMemo(() => {
    const newModel: ParamValue[] = [];
    for (const item of virtualParams) {
      newModel.push({ paramId: item.id, value: item.value });
    }
    return { paramValues: newModel };
  }, [virtualParams]);

  return (
    <div className="params-editor">
      {virtualParams.map((param) => (
        <Input
          title={param.name}
          value={param.value}
          key={param.id}
          changeValue={(v: string) => {
            changeVirtualParams(param.id, v);
          }}
        />
      ))}
      <div className="params-editor__button-wrapper">
        <div className="_item" onClick={getModel}>
          {isVisibleModel ? "Скрыть модели" : "Показать модели"}
        </div>
        <div className="_item" onClick={changeModels}>
          Сохранить модель
        </div>
      </div>
      {isVisibleModel && (
        <div className="params-editor__model-view-wrapper">
          <ModelView
            model={model}
            virtualModel={virtualModel}
            params={params}
          />
        </div>
      )}
    </div>
  );
};
