import Label from "@/components/Label/Label";
import React, { ReactNode } from "react";
import { FC } from "react";

export interface FormItemProps {
  className?: string;
  label?: string;
  desc?: ReactNode | string;
  children?: React.ReactNode;
}

const FormItem: FC<FormItemProps> = ({
  children,
  className = "",
  label,
  desc,
}) => {
  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <div className="mt-1.5">{children}</div>
      {desc && (
        <div className="block mt-3 text-xs text-neutral-500 dark:text-neutral-400 ">
          {desc}
        </div>
      )}
    </div>
  );
};

export default FormItem;
