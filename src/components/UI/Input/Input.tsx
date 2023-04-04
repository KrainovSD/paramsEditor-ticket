import "./Input.scss";
import { useState } from "react";

interface IInputProps {
  value: string;
  title: string;
  changeValue: (v: string) => void;
}

export const Input: React.FC<IInputProps> = ({ value, title, changeValue }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="custom-input">
      <p className="custom-input__caption">{title}</p>
      <input
        type="text"
        className={`custom-input__input ${isActive ? "_active" : ""}`}
        value={value}
        onFocus={() => {
          setIsActive(true);
        }}
        onBlur={() => {
          setIsActive(false);
        }}
        onChange={(e) => {
          changeValue(e.target.value);
        }}
      />
    </div>
  );
};
