#!/usr/bin/env bash
trap "exit" INT TERM ERR
trap "kill 0" EXIT

cd "$(dirname "$0")/$(dirname "$(readlink "$0")")"

yarn start > /dev/null &
ngrok http -log=stdout 5000 > /dev/null &

sleep 1
node openNgrokUrl.js

wait
