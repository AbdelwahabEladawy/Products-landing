import React from "react";

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "primary";
  className?: string;
}

export const Badge = ({
  label,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const baseStyle = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm";

  const variantStyle =
    variant === "success"
      ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
      : variant === "warning"
      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      : variant === "error"
      ? "bg-gradient-to-r from-red-400 to-pink-500 text-white"
      : variant === "primary"
      ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
      : "bg-gradient-to-r from-gray-400 to-gray-500 text-white";

  return <span className={`${baseStyle} ${variantStyle} ${className}`}>{label}</span>;
};
