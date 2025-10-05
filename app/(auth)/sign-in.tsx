import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function SignInPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpBike} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Bem-Vindo! 👋
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email:"
            placeholder="Insira seu email"
            icon={<Icon name="envelope" size={18} className="ml-4" />}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Senha:"
            placeholder="Insira sua senha"
            icon={<Icon name="lock" size={18} className="ml-4" />}
            secureTextEntry
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Entrar"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            className="text-lg text-center text-general-200 mt-10"
            href={"/sign-up"}
          >
            <Text>Não tem uma conta? </Text>
            <Text className="text-primary-500">Cadastrar</Text>
          </Link>
        </View>

        {/* Modal de Verificação */}
      </View>
    </ScrollView>
  );
}
