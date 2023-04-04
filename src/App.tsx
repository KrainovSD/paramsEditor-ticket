import {
  Model,
  Param,
  ParamsEditor,
} from "./components/ParamsEditor/ParamsEditor";

import { useState } from "react";

export const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: "Длина" },
    { id: 2, name: "Назначение" },
    { id: 3, name: "Тип" },
  ];
  const [model, setModel] = useState<Model>({
    paramValues: [
      { paramId: 1, value: "Макси" },
      { paramId: 2, value: "Повседневное" },
      { paramId: 3, value: "Строковый" },
    ],
  });

  return <ParamsEditor model={model} params={params} setModel={setModel} />;
};
