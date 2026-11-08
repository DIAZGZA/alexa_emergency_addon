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

# Establecer el directorio de trabajo base del contenedor
WORKDIR /app

# Argumento para romper la caché de Docker y obligar a una descarga limpia
ARG CACHE_BUST=2
RUN git clone https://github.com/DIAZGZA/alexa_emergency_addon .

# Script dinámico que busca dónde está realmente el package.json, cambia a esa ruta e instala/compila
RUN TARGET_DIR=$(find /app -name "package.json" -not -path "*/node_modules/*" -exec dirname {} \;) && \
    echo "Proyecto encontrado en: $TARGET_DIR" && \
    cd "$TARGET_DIR" && \
    pnpm install && \
    pnpm build

# Exponer el puerto por defecto de Next.js
EXPOSE 3000

# Script de inicio corregido que también autodetecta la ubicación del package.json para lanzar pnpm dev
CMD ["/bin/bash", "-c", "TARGET_DIR=$(find /app -name 'package.json' -not -path '*/node_modules/*' -exec dirname {} \\;) && cd \"$TARGET_DIR\" && if [ -f /data/options.json ]; then jq -r 'to_entries | .[] | \"\\(.key)=\\(.value)\"' /data/options.json > .env.local; fi && pnpm dev"]
