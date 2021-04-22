# How to run this project

1. Install node v14.16.1
2. Install npm v6.14.12
3. Install redis. If running in the same machine the app will use localhost by default
or you can setup the environment variables `REDIS_PORT` and `REDIS_HOST`. Currently,
authentication is not supported.
4. The app uses a default stun server but it is possible to setup a
custom stun server changing the `stun.config.json` file.
5. Install all the dependencies `npm install`
6. Run the app `npm run dev`. This command will compile the code and start the app
