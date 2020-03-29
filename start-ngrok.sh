#!/usr/bin/env bash
trap 'exit' INT TERM ERR
trap 'kill 0' EXIT

yarn start > /dev/null &
ngrok http -log=stdout 5000 > /dev/null &

sleep 1
node openNgrokUrl.js

wait