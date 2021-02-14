# Trending Github repository list 
In Github trending list you can find the repositories that are most popular for the community. You can filter them by selecting your preferred coding language or time-frequency.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

To run this application you need to have installed:
- Docker
- Node
- npm or yarn

## Start frontend
To get the frontend running locally:
```
Clone this repo
npm install or yarn to install all required dependencies
npm start or yarn start to start the local server

```

By default the app is available under: http://0.0.0.0:3000

## Prepare API

Since github-trending-api is currently unavailable run this command to build and start it inside a docker container:

```
yarn prepare-api
yarn start-api
```

To stop the running container with the API run the following command:
```
yarn stop-api
```

