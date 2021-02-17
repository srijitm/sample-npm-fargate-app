cat .env
echo "Updating the variables on .env file"
envsubst < .env > .env.tmp && mv .env.tmp .env
cat .env
echo "Starting node application"
npm start
