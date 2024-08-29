ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /vilnius_app/frontEnd

COPY . .

RUN npm install --include=dev

CMD [ "npm", "run", "dev" ]

EXPOSE 5173