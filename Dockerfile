FROM alpine:3.18.5

RUN apk add --no-cache curl bash pip

COPY ./bin /ssltest

RUN curl -L https://github.com/drwetter/testssl.sh/archive/3.0.zip -o /ssltest/testssl.sh

WORKDIR /ssltest

ENTRYPOINT ["sh", "./run.js"]