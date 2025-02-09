FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

Expose 5000

CMD ["node", "server.js"]
