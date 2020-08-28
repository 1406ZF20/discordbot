FROM alpine:3.7
RUN apk add maven
RUN apk add openjdk11 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
WORKDIR /app
COPY bot/ /app
CMD ./run.sh