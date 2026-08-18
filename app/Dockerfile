FROM node:22-alpine

RUN npm install -g npm@12.0.2

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]