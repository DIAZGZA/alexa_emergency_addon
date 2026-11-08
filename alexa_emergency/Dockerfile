ARG BUILD_FROM=ghcr.io/home-assistant/aarch64-base:latest
FROM ${BUILD_FROM}

# Instalar dependencias esenciales del sistema, Node.js y Git
RUN apk add --no-cache \
    nodejs \
    npm \
    git \
    jq \
    alsa-utils \
    pulseaudio-utils

# Instalar pnpm 10 de manera global
RUN npm install -g pnpm@10

# Establecer el directorio de trabajo del contenedor
WORKDIR /app

# Clonar tu repositorio público completo de Alexa
RUN git clone https://github.com/DIAZGZA/alexa_emergency_addon .

# CAMBIO CLAVE: Entrar a la subcarpeta donde realmente reside tu aplicación de Next.js
WORKDIR /app/alexa_emergency

# Instalar módulos de Node y compilar Next.js
RUN pnpm install && pnpm build

# Exponer el puerto por defecto de Next.js
EXPOSE 3000

# Script de inicio (Corregida la sintaxis del filtro jq para evitar errores en las comillas)
CMD ["/bin/bash", "-c", "if [ -f /data/options.json ]; then jq -r 'to_entries | .[] | \"\\(.key)=\\(.value)\"' /data/options.json > .env.local; fi && pnpm dev"]
