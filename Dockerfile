FROM node:25-slim

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

ENV CI=true

RUN pnpm i

COPY . .

EXPOSE 5000

CMD ["pnpm", "dev"]