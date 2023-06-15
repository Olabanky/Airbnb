"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean /*optional boolean */;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement /*optional React.ReactElement  */;
  footer?: React.ReactElement;
  actionLabel: string /*required string */;
  disabled?: boolean;
  secondaryAction?: () => void /*optional void  */;
  secondaryActionLabel?: string /*optional void  */;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    //first check if modal is disabled. if it is, its going to break and nothing will happen when we click on close button
    if (disabled) {
      return;
    }

    //otherwise
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300 /*to last 300 miliseconds due to animation we want to add*/);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    //first check if modal is disabled.
    if (disabled) {
      return;
    }
    //otherwise call onSubmit
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    //first check if modal is disabled or if we dont have a secondary action at all
    if (disabled || !secondaryAction) {
      return;
    }
    //else
    secondaryAction();
  }, [disabled, secondaryAction]);

  //conditinals
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center
          items-center
          flex
          overflow-x-hidden
          overflow-y-auto
          fixed
          inset-0
          z-50
          focus: outline-none
          bg-neutral-800/70

        "
      >
        <div
          className="
              relative
              w-full
              md:w-4/6
              lg:w-3/6
              xl:w-2/5
              my-6
              mx-auto
              h-full
              lg:h-auto
              md:h-auto
            "
        >
          {/* CONTENT */}
          <div
            className={`
              translate
              dutration-300 /*by how much we delayed earlier */
              h-ful
              ${showModal ? "translate-y-0" : "translate-y-full"}
              ${showModal ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className="
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
              "
            >
              {/* HEADER */}
              <div
                className="
                  flex
                  items-center
                  p-6
                  rounded-t
                  justify-center
                  relative
                  border-b
                "
              >
                <button
                  onClick={handleClose}
                  className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-4">
                <div
                  className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
