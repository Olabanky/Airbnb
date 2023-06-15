"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues> /* register is a field (NOT OUR REGISTER FORM) that we will need for the react hook form*/;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text" /* default type is text*/,
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
         "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" " /*with an empty space*/
        type={type}
        className={`
            peer /*with peer, we can control its siblings */
            w-full
            p-4
            pt-6
            font-light
            bg-white
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${
              formatPrice ? "pl-9" : "pl-4"
            } /* if we have formatPrice option, pl set to 9 */
            ${
              errors[id] ? "border-rose-500" : "border-neutral-300"
            }/* if error, we find id of the input*/
            ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}    
        `}
      />
      <label
        className={`
            absolute
            text-md
            duration-150
            transform
            -transfor-y-3
            top-5
            z-10
            origin-[0]
            ${formatPrice ? "left-9" : "left-4"}
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-100
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? "text-rose-500" : "text-zinc-400"}
          
        `}
      >
        {label}
      </label>
    </div>
  );
};
export default Input;
