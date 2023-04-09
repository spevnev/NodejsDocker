FROM node:19-bullseye AS build

RUN apt-get update && \
    apt-get install -y --no-install-recommends tini && \
    rm -rf /var/cache/apt/archives /var/lib/apt/lists/* && \
    npm install -g pnpm

WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production
COPY --chown=node:node . .
RUN pnpm build && \
    pnpm prune --prod

#! Production #1 (163MB)
# FROM node:19-bullseye-slim

# USER node
# WORKDIR /app
# ENV NODE_ENV=production
# EXPOSE 3000

# COPY --chown=node:node --from=build /usr/bin/tini /app/out .
# COPY --chown=node:node --from=build /app/node_modules node_modules

# ENTRYPOINT ["./tini"]
# CMD ["node", "main.js"]

#! Production #2 (244MB)
FROM gcr.io/distroless/nodejs18

USER 1000
WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

COPY --chown=1000:1000 --from=build /usr/bin/tini /app/out .
COPY --chown=1000:1000 --from=build /app/node_modules node_modules

ENTRYPOINT ["./tini"]
CMD ["/nodejs/bin/node", "main.js"]