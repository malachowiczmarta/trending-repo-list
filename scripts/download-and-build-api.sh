#!/bin/bash

git clone https://github.com/huchenme/github-trending-api github-trending-api

docker build -t github-trending-api ./github-trending-api
