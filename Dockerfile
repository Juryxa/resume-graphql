FROM node:26-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

ENV DATABASE_URL="file:./dev.db"
RUN npx prisma db push --accept-data-loss --skip-generate \
 && npx tsx prisma/seed.ts

RUN npm prune --omit=dev

FROM node:26-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL="file:./dev.db"

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dev.db ./dev.db

USER node
CMD ["node", "dist/main.js"]