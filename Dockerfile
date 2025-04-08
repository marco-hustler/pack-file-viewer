
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]