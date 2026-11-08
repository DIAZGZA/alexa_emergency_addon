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

# Descargar el repositorio rompiendo la caché para obtener los nuevos archivos
ARG CACHE_BUST=3
RUN git clone https://github.com/DIAZGZA/alexa_emergency_addon .

# Moverse a la carpeta interna donde acabas de subir el proyecto Next.js
WORKDIR /app/alexa_emergency

# Instalar módulos de Node y compilar Next.js
RUN pnpm install && pnpm build

# Exponer el puerto por defecto de Next.js
EXPOSE 3000

# Script de arranque
CMD ["/bin/bash", "-c", "if [ -f /data/options.json ]; then jq -r 'to_entries | .[] | \"\\(.key)=\\(.value)\"' /data/options.json > .env.local; fi && pnpm dev"]
