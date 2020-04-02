#!/usr/bin/env bash
trap "exit" INT TERM ERR
trap "kill 0" EXIT

cd "$(dirname "$0")/$(dirname "$(readlink "$0")")"

npm start > /dev/null &
node_modules/.bin/ngrok http -log=stdout 5000 > /dev/null &

echo "Building Mirror of Erised..."
sleep 2
node openNgrokUrl.js

wait
