# 🧠 Jogo da Memória - React Native & Expo

Este projeto é uma aplicação mobile de Jogo da Memória desenvolvida para fins acadêmicos. O objetivo principal foi explorar o desenvolvimento de interfaces mobile, manipulação de estados no React e componentização.

A aplicação foi construída utilizando **React Native** e o ecossistema **Expo**, permitindo que o jogo rode tanto em dispositivos móveis (Android/iOS) quanto diretamente no navegador (Web).

---

## 🌐 Demonstração (Versão Web)
O projeto está buildado e hospedado na Vercel. Você pode jogar diretamente pelo seu navegador clicando no link abaixo:
👉 **[CLIQUE AQUI PARA JOGAR](URL_DA_VERCEL_AQUI)**

Para ser hospedado na Vercel, por ser uma aplicação que utiliza o Expo para rodar via Android/iOS
Foi necessário configurar o código através das linhas de comando:

Instalar o suporte web para o projeto:
* npx expo install react-native-web react-dom 
Gerar a pasta do site (Build):
* npx expo export --platform web
---

## 🚀 Tecnologias Utilizadas
* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/) (SDK 54)
* [TypeScript / JavaScript](https://www.typescriptlang.org/)

---

## 📋 Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão LTS recomendada)
* [Git](https://git-scm.com/)
* Uma IDE de sua preferência (Recomendado: [VS Code](https://code.visualstudio.com/))

Para testar no celular, instale o aplicativo **Expo Go**:
* Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
* iOS: [App Store](https://apps.apple.com/us/app/expo-go/id982107779)

---

## 🔧 Como Rodar a Aplicação Localmente

### 1. Clonar o Repositório
Abra o terminal (PowerShell ou Bash) e clone o projeto para a sua máquina:
```bash
git clone https://github.com/Gab625/jogo-da-memoria-react-expo.git

### 2. Entrar na pasta do projeto

cd JogoDaMemoria

### 3. Instalar Dependências

npm install --legacy-peer-deps

### 4. Inicializar o Servidor do Expo

npx expo start

### 5. Como Testar
No Celular (Android ou iOS)
Certifique-se de que o seu celular e o seu computador estão conectados na mesma rede Wi-Fi.

Após rodar o comando npx expo start, um QR Code será gerado no terminal.

Abra o aplicativo Expo Go no seu celular:

Android: Use a opção "Scan QR Code" dentro do próprio app.

iOS: Abra a câmera nativa do iPhone e aponte para o código.

O Metro Bundler fará o download do código e o jogo abrirá na tela!