#!/bin/sh

if [[ ! -f /app/.next/build-manifest.json ]]; then
  yarn build || exit 1
fi

yarn start
