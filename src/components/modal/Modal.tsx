import type { MouseEventHandler } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Portal, { createContainer } from "../portal/Portal.tsx";

import { useThemeContext } from "@/hooks/useThemeContext.tsx";
import { cn } from "@/utils/helpers";
import { IoClose } from "react-icons/io5";

const MODAL_CONTAINER_ID = "modal-container-id";

type Props = {
  title: string;
  onClose?: () => void;
  children: React.ReactNode | React.ReactNode[];
};

const Modal = (props: Props) => {
  const { theme } = useThemeContext();
  const { title, onClose, children } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);
  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("click", handleWrapperClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("click", handleWrapperClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  const handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> =
    useCallback(() => {
      onClose?.();
    }, [onClose]);

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur",
        )}
        ref={rootRef}
        data-testid="wrap"
      >
        <div
          className={cn(
            "bg-indicator-white relative flex w-[500px] flex-col rounded-xl border px-5 py-10",
            {
              "bg-dark-foreground border-dark text-white": theme === "dark",
            },
          )}
        >
          <div onClick={handleClose}>
            <IoClose
              className={cn(
                "border-full bg-red-7000 absolute right-2 top-2 m-0 cursor-pointer border-0 bg-transparent text-2xl",
              )}
            />
          </div>
          <h1 className="mb-10 text-xl">{title}</h1>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
