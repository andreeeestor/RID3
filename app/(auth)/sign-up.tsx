import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        username: form.name,
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("ERRO", err.errors[0].longMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        // dps criar o usuário no banco de dados
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setVerification({
          ...verification,
          error: "Verificação deu erro.",
          state: "failed",
        });
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpBike} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Crie Sua Conta
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Nome:"
            placeholder="Insira seu nome"
            icon={<Icon name="user" size={18} className="ml-4" />}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title="Cadastrar"
            onPress={onSignUpPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            className="text-lg text-center text-general-200 mt-10"
            href={"/sign-in"}
          >
            <Text>Já tem uma conta? </Text>
            <Text className="text-primary-500">Entrar</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verificação
            </Text>
            <Text className="font-Jakarta mb-5">
              Mandamos um código de verificação para: {form.email}
            </Text>
            <InputField
              label="Código:"
              icon={<Icon name="lock" size={18} className="ml-4" />}
              placeholder="Ex: 12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code: code })
              }
            />

            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title="Verificar Email"
              onPress={onVerifyPress}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Icon size={110} name="check" className="mx-auto my-5" />
            <Text className="text-3xl font-JakartaBold text-center">
              Verificado!
            </Text>

            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              Sua conta foi verificada com sucesso.
            </Text>

            <CustomButton
              title="Fechar"
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/(root)/(tabs)/home");
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
