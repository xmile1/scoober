FROM node:18-alpine AS builder

WORKDIR /code/

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build


FROM devforth/spa-to-http:latest
COPY --from=builder /code/dist/ . 
