import { ReactElement } from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title?: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: ReactElement;
  IconRight?: ReactElement;
  className?: string;
}

export default function CustomButton(props: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      className={`w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(
        props.bgVariant
      )}  ${props.className}`}
    >
      {props.IconLeft}
      <Text className={`text-lg font-bold ${getTextVariantStyle(props.textVariant)}`}>{props.title}</Text>
      {props.IconRight}
    </TouchableOpacity>
  );
}

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white"
  }
};
