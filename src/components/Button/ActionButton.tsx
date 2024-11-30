"use client";

import useOutSideClick from "@/hooks/useOutsideClick";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

export type ActionButtonEntryType = {
  icon?: React.ReactNode;
  label: string;
  type: "link" | "button";
  href?: string;
  onClick?: () => void;
}

interface ActionButtonProps {
  icon?: React.ReactNode;
  entries: ActionButtonEntryType[];
  buttonClassName?: string;
  popupClassName?: string;
  popupPosition?: string;
}

export default function ActionButton({ icon, entries, buttonClassName, popupClassName, popupPosition }: ActionButtonProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popUpRef = useRef<HTMLDivElement>(null);

  useOutSideClick(buttonRef, popUpRef, setVisible);

  const handleClick = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setVisible(!visible);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`p-2 rounded-full hover:bg-black/20 text-white ${buttonClassName}`}
      >
        {
          icon ? icon : <MoreVerticalIcon className="w-4 h-4 text-white" />
        }
      </button>
      {visible && (
        <div
          ref={popUpRef}
          onClick={handleClick}
          className={`
            absolute ${popupPosition ?? "top-[100%] left-0"} z-[5] overflow-hidden
            bg-steelGray
            text-sm text-white
            border border-royalPurple/30
            rounded-xl
            transition-all duration-200
            hover:border-electricViolet/50
            flex flex-col
            ${popupClassName}
            `}
        >
          {entries.map((entry, index) => {
            return entry.type == "link" ? (
              <Link
                key={index}
                href={entry.href ?? ""}
                className="flex items-center px-4 py-[6px] hover:bg-silver/10 text-start"
              >
                {entry.icon != undefined && entry.icon}
                {entry.label}
              </Link>
            ) : (
              <button
                key={index}
                onClick={entry.onClick}
                className="flex items-center px-4 py-[6px] hover:bg-silver/10 text-start"
              >
                {entry.icon != undefined && entry.icon}
                {entry.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
