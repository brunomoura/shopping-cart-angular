#!/bin/bash

cd /var/www/
npm install
npm rebuild node-sass --force
ng serve --host 0.0.0.0 --disable-host-check