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

# Establecer el directorio base dentro del contenedor
WORKDIR /workspace

# CAMBIO CLAVE: Usamos un número de caché único (9) para obligar a Docker a clonar de nuevo
ARG CACHE_BUST=9
RUN git clone https://github.com/DIAZGZA/alexa_emergency_addon .

# Moverse exactamente a la carpeta donde residen tu package.json y tu directorio app/
WORKDIR /workspace/alexa_emergency

# Configurar pnpm mediante variables de entorno globales compatibles para omitir bloqueos de seguridad
RUN pnpm config set side-effects-cache false && \
    pnpm config set ignore-scripts false && \
    pnpm install --no-frozen-lockfile && \
    pnpm build

# Exponer el puerto por defecto de Next.js
EXPOSE 3000

# Script de inicio que mapea las opciones de Home Assistant al .env.local de tu Next.js
CMD ["/bin/bash", "-c", "if [ -f /data/options.json ]; then jq -r 'to_entries | .[] | \"\\(.key)=\\(.value)\"' /data/options.json > .env.local; fi && pnpm dev"]
