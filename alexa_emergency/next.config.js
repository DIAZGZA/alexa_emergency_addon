/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Si usas la carpeta 'src' o necesitas optimizaciones específicas para contenedores Docker (como Home Assistant)
  output: 'standalone', 
};

module.exports = nextConfig;
