import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signUpBike from "@/assets/images/signup-bike.png"

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  signUpBike
};

export const onboarding = [
  {
    id: 1,
    title: "Agilidade e economia em duas rodas!",
    description:
      "Sua jornada começa com o RID3. Encontre a moto ideal para sua corrida de forma rápida e fácil.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Escolha sua experiência, do seu jeito",
    description:
      "Selecione a cilindrada da moto e o gênero do motorista. Você tem o controle da sua corrida.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Segurança, inclusão e rapidez. Vamos nessa?",
    description:
      "Informe seu destino, relaxe e aproveite uma viagem ágil e segura com motoristas certificados.",
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};
