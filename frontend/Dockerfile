# Estágio 1: Build da aplicação Next.js (Debian slim garante compatibilidade com compiladores/ARM64)
FROM node:22-slim AS builder

WORKDIR /app

# Copiar dependências
COPY package*.json ./

# Instalar compiladores nativos caso Next.js / ARM64 precise, e ignorar lockfile do Windows
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
RUN rm -f package-lock.json && npm install

# Copiar o resto do código
COPY . .

# Injetar a URL relativa da API para o build
ENV NEXT_PUBLIC_API_URL=/api

# Fazer o build dos arquivos estáticos (Next.js config output: 'export' vai criar a pasta /out)
RUN npm run build

# Estágio 2: Nginx para servir
FROM nginx:alpine

# Remover as páginas padrões do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar a pasta 'out' gerada na etapa de build
COPY --from=builder /app/out /usr/share/nginx/html

# Copiar a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80 do container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
