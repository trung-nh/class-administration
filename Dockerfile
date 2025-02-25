FROM node:18-alpine

WORKDIR '/class-administration'

COPY package.json .

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run migration:run && pnpm run start:dev"]