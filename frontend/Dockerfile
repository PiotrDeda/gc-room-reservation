FROM node:21-alpine
WORKDIR /app
COPY package*.json ./
COPY vite.config.js ./
RUN npm install
COPY . .
EXPOSE 25498
RUN npm run build
ENTRYPOINT ["npm", "run", "prod"]
