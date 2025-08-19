import { ButtonProps } from "../models/prop.model";

export const TabButton = ({ onClick, children, icon, className = '' }: ButtonProps) => (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-[150px] ml-5 px-3 py-4 text-black rounded-md border-2 border-transparent transition-colors transition-shadow duration-400 hover:bg-black hover:text-white hover:border-white hover:shadow-sm hover:scale-[1.02] focus:outline-none leading-tight ${className}`}>
      {icon && <span className="absolute left-3">{icon}</span>}
      {children}
    </button>
  );