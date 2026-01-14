"use client";
import { useState } from "react";

interface SwitchingTabProps {
  readonly left: string;
  readonly right: string;
  readonly setActiveIndex: (index: number) => void;
}

export default function SwitchingTab({
  left,
  right,
  setActiveIndex,
}: SwitchingTabProps) {
  const [active, setActive] = useState(true);

  // handle active tab
  const handleActiveTab = (index: number) => () => {
    setActiveIndex(index);
    setActive(!active);
  };

  return (
    <div className="bg-white rounded-[20px] p-[2px]  w-[200px] sm:w-[220px] ml-4 overflow-hidden">
      <div className="  flex relative">
        <button
          className={`${
            active ? "text-white active-tab" : "text-black"
          }  w-full transition-colors duration-300 text-[15px] ease-linear py-[3px] rounded-[20px] relative z-10 `}
          onClick={handleActiveTab(0)}
        >
          {left}
        </button>
        <button
          className={`${
            !active ? "text-white active-tab " : "text-black"
          }  transition-colors duration-300 text-[15px] ease-linear w-full py-[3px] rounded-[20px] relative z-10 `}
          onClick={handleActiveTab(1)}
        >
          {right}
        </button>
        <div
          className={`${
            active ? "translate-x-[0%]" : "translate-x-[50%]"
          } w-full absolute top-0 rounded-[20px]  transition-transform duration-300  h-full   box-border`}
        >
          <div className="w-1/2 gradient-color  rounded-[20px]   h-full"></div>
        </div>
      </div>
    </div>
  );
}
