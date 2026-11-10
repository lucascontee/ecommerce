FROM node:24-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expõe a porta do Vite
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]