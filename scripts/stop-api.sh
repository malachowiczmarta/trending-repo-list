#!/bin/bash

docker stop $(docker ps -q --filter ancestor=github-trending-api)