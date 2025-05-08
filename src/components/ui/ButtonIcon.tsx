"use client";

interface ButtonIconProps {
  icon: React.ReactNode;
  hoverClass?: string;
  taskId?: string;
  onClick?: (taskId: string) => void;
}

const ButtonIcon = ({ icon, hoverClass, taskId, onClick }: ButtonIconProps) => {
  return (
    <button
      onClick={() => onClick?.(taskId ?? "")}
      className={`text-2xl text-gray-500 cursor-pointer transition-all duration-300 ${hoverClass}`}
    >
      {icon}
    </button>
  );
};

export default ButtonIcon;
