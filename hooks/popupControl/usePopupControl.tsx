import React, { useEffect, useRef, useState } from "react";

const usePopupControl = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  // toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //outside click
  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
  ) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return { isOpen, toggleMenu, dropDownRef };
};

export default usePopupControl;
