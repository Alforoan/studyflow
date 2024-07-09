import React from "react";

export enum ButtonStyle {
  OuterPrimary,
  OuterSecondary,
  OuterCancel,
  OuterBack,
  InnerOther,
  InnerConfirm,
  InnerDelete,
  InnerSecondaryConfirm,
  InnerSecondaryDelete,
}

interface ButtonComponentProps {
  text: string;
  click: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonType: ButtonStyle;
  additionalStyles?: string;
  type?: "submit" | "reset" | "button";
  icon?: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  click,
  buttonType,
  additionalStyles = "",
  type,
  icon = null,
}) => {
  let buttonClass = "font-primary rounded flex items-center justify-center";

  switch (buttonType) {
    case ButtonStyle.OuterPrimary:
      buttonClass +=
        " bg-flair text-secondaryElements hover:text-white py-2 px-4";
      break;
    case ButtonStyle.OuterSecondary:
      buttonClass +=
        " bg-flairSecondary border-flair font-primary text-flair hover:bg-flair hover:text-white py-2 px-4";
      break;
    case ButtonStyle.OuterCancel:
      buttonClass +=
        " bg-warning font-primary text-secondaryElements hover:text-white py-2 px-4";
      break;
    case ButtonStyle.InnerConfirm:
      buttonClass +=
        " ml-1 mt-8 py-1.5 px-3 text-sm bg-flair text-white rounded hover:bg-slate-700";
      break;
    case ButtonStyle.InnerDelete:
      buttonClass +=
        " ml-1 mt-8 py-1.5 px-3 text-sm bg-warning text-white rounded";
      break;
    case ButtonStyle.InnerOther:
      buttonClass +=
        " ml-1 mt-8 py-1.5 px-3 text-sm bg-slate-600 text-white rounded hover:bg-slate-700";
      break;
    case ButtonStyle.InnerSecondaryConfirm:
      buttonClass +=
        " ml-1 mt-8 py-1.5 px-3 text-sm bg-flair text-white rounded hover:bg-slate-700";
      break;
    case ButtonStyle.InnerSecondaryDelete:
      buttonClass +=
        " ml-1 mt-8 py-1.5 px-3 text-sm bg-warning text-white rounded hover:bg-slate-700";
      break;
    default:
      buttonClass = "border rounded p-2";
      break;
  }

  buttonClass += ` ${additionalStyles}`;

  return (
    <button
      className={buttonClass}
      onClick={(e) => click(e)}
      aria-label={`${text} Button`}
      type={type}
    >
      {icon} {icon ? <span className={"ml-2"}> {text}</span> : text}
    </button>
  );
};

export default ButtonComponent;
