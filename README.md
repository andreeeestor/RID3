# 🏍️ RID3R - Mobilidade Urbana sobre Duas Rodas

RID3R é uma aplicação de mobilidade urbana que conecta motociclistas e passageiros, oferecendo uma alternativa ágil, econômica e acessível para o transporte nas cidades.  
Focado na personalização da experiência e na segurança do usuário, nosso serviço se diferencia por colocar o controle nas mãos de quem viaja.

---

## 🚀 Sobre o Projeto

Inspirado no modelo de sucesso de aplicativos como Uber e 99, o RID3R se especializa exclusivamente em **corridas de moto**.  
A ideia central é simples: fornecer um transporte rápido e eficiente que se adapta perfeitamente ao ritmo acelerado do contexto urbano, **sem abrir mão da segurança e da inclusão**.

Nossa identidade é **humanizada**, buscando **proximidade com as pessoas** e reforçando a **inclusão social e a igualdade de gênero** no trânsito.

---

## ✨ Principais Funcionalidades

### 👥 Para Passageiros:

#### 🚘 Escolha Personalizada da Corrida
- Selecione a **cilindrada da moto** (pequena, média ou alta) de acordo com sua preferência de conforto e velocidade.  
- Escolha o **gênero do(a) motorista** (homem ou mulher), garantindo mais conforto e segurança, especialmente para o público feminino.

#### 📅 Agendamento de Viagens
- Programe suas corridas com antecedência — ideal para viagens que exigem motos de maior cilindrada ou planejamento prévio.

#### 💰 Tarifação Dinâmica
- Preços justos e transparentes, que variam de acordo com a **distância**, **demanda**, **tipo de moto** e **horário**.

#### 🛡️ Segurança e Inclusão
- **Segurança Reforçada:** Motoristas certificados e com checagem de antecedentes.  
- **Foco na Inclusão:** Incentivo à participação de **mulheres motociclistas** e criação de um ambiente acolhedor.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack moderna e robusta, garantindo escalabilidade e uma ótima experiência de usuário:

### 📱 Frontend (Mobile)
- **Framework:** React Native com Expo  
- **Linguagem:** TypeScript  
- **Estilização:** Tailwind CSS (via NativeWind)  
- **Navegação:** Expo Router  
- **Gerenciamento de Estado:** Zustand  

### ⚙️ Backend
- **API Routes do Expo**  
- **Banco de Dados:** PostgreSQL (via Neon)  
- **Autenticação:** Clerk  
- **Pagamentos:** Stripe  
- **Mapas e Geolocalização:** Google Maps Platform (APIs de Places e Directions)

---

## 💪 Pontos Fortes

- 🚦 **Nicho de Mercado Claro:** foco total em transporte de moto — rápido, econômico e adaptado para o contexto urbano.  
- 🧍‍♀️ **Diferencial Competitivo:** ênfase em **segurança e inclusão**, respondendo a uma demanda real do mercado.  
- 🧭 **Controle para o Usuário:** personalização da corrida e escolha do motorista.  
- ⚙️ **Modelo Escalável:** potencial de expansão para **aluguel de motos** e novos serviços.

---

## 🔮 Visão de Futuro

O próximo passo será o **sistema de aluguel de motos**, permitindo:
- Que novos motoristas ingressem na plataforma;
- Que motoristas atuais atualizem sua frota e aumentem seus ganhos;
- Que a comunidade RID3R se fortaleça como um ecossistema de mobilidade sobre duas rodas.

---

## 🏁 Como Começar

Para executar este projeto localmente, siga os passos abaixo:

### 1️⃣ Clone o repositório:
```bash
git clone https://github.com/seu-usuario/rid3r.git
```

### 2️⃣ Acesse o diretório do projeto:
```bash
cd rid3r
```

### 3️⃣ Instale as dependências:
```bash
npm install
```

### 4️⃣ Configure as variáveis de ambiente:
- Renomeie o arquivo `.env.example` para `.env`
- Adicione suas chaves de API (Clerk, Stripe, Google Maps, Neon)

### 5️⃣ Inicie o servidor de desenvolvimento:
```bash
npx expo start
```

### 6️⃣ Teste no dispositivo:
- Escaneie o **QR Code** exibido no terminal com o aplicativo **Expo Go** (Android ou iOS).

---

## 🧭 Estrutura do Projeto

```bash
rid3r/
├── app/                  # Código principal do aplicativo (Expo Router)
├── components/           # Componentes reutilizáveis (UI e layouts)
├── hooks/                # Hooks customizados (Zustand, APIs, etc.)
├── lib/                  # Configurações (Stripe, Clerk, Maps, etc.)
├── assets/               # Ícones, imagens e fontes
├── .env.example          # Exemplo de variáveis de ambiente
└── README.md
```

---

## 📚 Licença

Este projeto é licenciado sob a licença **MIT**.  
Sinta-se à vontade para estudar, modificar e contribuir.

---

## ✨ Créditos

Desenvolvido com ❤️ por **André Nestor**  
📦 Repositório: [https://github.com/seu-usuario/rid3r](https://github.com/seu-usuario/rid3r)
