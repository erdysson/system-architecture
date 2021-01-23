echo 'Installing Test packages...'

npm install

echo 'Starting e2e tests...'

npm run cypress:run
