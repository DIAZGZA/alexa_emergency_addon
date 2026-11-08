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

# Instalar módulos de Node y compilar Next.js
RUN pnpm install && pnpm build

# Exponer el puerto por defecto de Next.js
EXPOSE 3000

# Script de inicio que genera el archivo .env.local a partir de la interfaz de Home Assistant
CMD ["/bin/bash", "-c", "if [ -f /data/options.json ]; then jq -r 'to_entries | .[] | \"\\(.key)=\\(.value)\"\"' /data/options.json > .env.local; fi && pnpm dev"]
