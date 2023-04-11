FROM node:19-bullseye AS build

RUN apt-get update && \
    apt-get install -y --no-install-recommends tini && \
    rm -rf /var/cache/apt/archives /var/lib/apt/lists/* && \
    npm install -g pnpm

WORKDIR /app

COPY --chown=node:node . .
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production
RUN pnpm -r build && \
    pnpm prune --prod

#! Production #1 (244MB)
# FROM node:19-bullseye-slim

# USER node
# WORKDIR /app
# ENV NODE_ENV=production
# ARG repo
# EXPOSE 3000

# COPY --chown=node:node --from=build /usr/bin/tini /usr/bin/tini
# COPY --chown=node:node --from=build /app .

# WORKDIR $repo

# ENTRYPOINT ["tini"]
# CMD ["node", "dist"]

#! Production #2 (163MB)
FROM gcr.io/distroless/nodejs18

USER 1000
WORKDIR /app
ENV NODE_ENV=production
ARG repo
EXPOSE 3000

COPY --chown=node:node --from=build /usr/bin/tini /usr/bin/tini
COPY --chown=1000:1000 --from=build /app .

WORKDIR $repo

ENTRYPOINT ["tini"]
CMD ["/nodejs/bin/node", "dist"]