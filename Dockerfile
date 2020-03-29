FROM node:12-alpine AS build

WORKDIR /build

COPY . .

RUN npm ci
RUN npx next build

RUN mkdir -p /etc/data

ENV DATA_LOCATION="/etc/data/data.csv"

EXPOSE 80

ENTRYPOINT ["npx", "next", "start"]
CMD ["-p", "80"]
