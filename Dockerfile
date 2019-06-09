FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

CMD ["foreman", "start"]
