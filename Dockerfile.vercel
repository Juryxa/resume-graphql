FROM node:24.21.0-alpine3.23 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm ci

COPY . .

ENV DATABASE_URL="file:./dev.db"
RUN npx prisma generate
RUN npx tsx generate-typings.ts
RUN npm run build


RUN npx prisma db push --accept-data-loss \
 && npx tsx prisma/seed.ts

RUN npm prune --omit=dev

FROM node:24.21.0-alpine3.23
WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL="file:./dev.db"

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dev.db ./dev.db

USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]