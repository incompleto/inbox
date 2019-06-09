FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn
RUN yarn install

COPY . .

CMD ["foreman", "start"]
