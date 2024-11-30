FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 5000

FROM base as builder
WORKDIR /app
COPY . .
RUN yarn install next@latest
RUN yarn build


FROM base as production
WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD yarn start

FROM base as dev
RUN yarn install --frozen-lockfile
COPY . .
CMD yarn dev