import { ReactElement } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface InputFieldProps {
  label: string;
  labelStyle?: string;
  placeholder?: string;
  icon?: ReactElement;
  value?: string;
  containerStyle?: string;
  onChangeText?: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  inputStyle?: string
  editable?: boolean
}

export default function InputField(props: InputFieldProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={`text-lg font-JakartaSemiBold mb-3 ${props.labelStyle}`}
          >
            {props.label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${props.containerStyle}`}
          >
            {props.icon}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold flex-1 ${props.inputStyle} text-left`}
              secureTextEntry={props.secureTextEntry}
              keyboardType={props.keyboardType}
              autoCapitalize="none"
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
