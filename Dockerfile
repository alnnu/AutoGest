ARG PLATFORM=linux/amd64
ARG IMAGE=node:alpine 

FROM --platform=$PLATFORM $IMAGE as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as builder
WORKDIR /app
# Copia o resto dos arquivos do projeto
COPY . .
# Usa npm install no lugar de npm ci
RUN npm install
# Roda o build do Next.js
RUN npm run build

FROM --platform=linux/arm64 arm64v8/node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

# Copia os artefatos gerados no builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# CORREÇÃO 2: Removido o 'RUN npm ci' que estava aqui.
# Como você já está copiando a pasta 'node_modules' inteira do estágio 'builder' 
# logo acima, rodar npm ci novamente aqui é redundante e causava o erro.

CMD ["npm", "start"]
