#!/usr/bin/env bash

CONTAINER_NAME=next-auth-aspnetcore-adapter-test
CONTAINER_PORT=8080
IMAGE_NAME="fergalmoran/aspnet-identity-sample"

echo "Cleaning up"
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

echo "Spinning up API endpoints"
docker run -d --rm \
  --name $CONTAINER_NAME \
  -p ${CONTAINER_PORT}:8080 \
  $IMAGE_NAME


echo "Waiting for container start..." && sleep 1

jest ./index.test.ts --forceExit
docker stop $CONTAINER_NAME
