import { useEffect } from "react";

type OutsideNotifierHook = (
  buttonRef: React.RefObject<HTMLButtonElement | HTMLDivElement>,
  popUpRef: React.RefObject<HTMLDivElement>,
  onOutsideClick: (isInside: false) => void,
  delay?: number,
) => void;

const useOutSideClick: OutsideNotifierHook = (
  buttonRef,
  popUpRef,
  onOutsideClick,
  delay,
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (buttonRef.current && !buttonRef.current.contains(target)) {
        setTimeout(() => {
          if (popUpRef.current) {
            if (!popUpRef.current.contains(target)) {
              onOutsideClick(false);
            }
          } else {
            onOutsideClick(false);
          }
        }, delay);
        
      } else if (buttonRef.current && buttonRef.current.contains(target)) {
        setTimeout(() => {
          if (popUpRef.current) {
            const rect = popUpRef.current.getBoundingClientRect();
            const isVisible = rect.bottom <= window.innerHeight;
            if (!isVisible) {
              popUpRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
              });
            }
          }
        }, 300);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [buttonRef, onOutsideClick]);
};

export default useOutSideClick;
