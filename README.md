
# Botkit bot

This is the demo for the NodeMN presentation.

To run this project first you need to create a bot user in slack.

`https://[YOUR TEAM NAME].slack.com/services/new/bot`

Make sure you have docker and docker-compose installed in your computer.

[Docker install](https://docs.docker.com/engine/installation/)

[Docker Compose install](https://docs.docker.com/compose/install/)

***

Clone the repository and run:

```bash
$ cd botkit-bot/

$ docker-compose build

$ docker-compose up -d
```
After these is done you should have a docker service running in the background.

You can verify that it's running by running:

```bash
$ docker-compose ps
```
And should output:

```
Name          Command     State    Ports
---------------------------------------------
botkitbot_web_1   sleep 9999   Exit 0
```

Connect to your service:

```
$ docker-compose run web /bin/bash
```

You should be able to get a shell with your code included.

You can run an `ls` to verify.

You are going to need a `.env` file at the root of the project that looks like this:

```
NODE_ENV=DEV  // this could be PROD too
SLACK_TOKEN_ID= [your slack bot token id]
TWILIO_ACCOUNT_SID= [Twilio account id]
TWILIO_API_KEY= [Twilio SMS api key]
TWILIO_API_SECRET= [Twilio SMS api secret]
FROM_NUMBER=+15555555555 // numbers registered with Twilio
TO_NUMBER=+16666666666
```
These are environment variables propagated in your docker image.

### Run the code:

```bash
$ npm install

$ npm start
```
