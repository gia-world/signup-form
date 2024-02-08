import { ReactNode } from "react";

type Props = {
  fieldName: string;
  label: string;
  guide?: string;
  error?: string | false | undefined;
  isValid?: boolean;
  children: ReactNode;
};

export default function InputBox({
  fieldName,
  label,
  guide,
  error,
  isValid,
  children,
}: Props) {
  return (
    <div className="input-box">
      <label htmlFor={fieldName}>{label}</label>
      {guide && <span className="guide">{guide}</span>}
      {isValid && <span>✅</span>}
      {children}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
