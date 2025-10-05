import Icon from "react-native-vector-icons/FontAwesome5";

interface Fa5IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  solid?: boolean;
}
export default function Fa5Icon(props: Fa5IconProps) {
  return <Icon {...props} />;
}
