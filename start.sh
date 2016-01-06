#!/bin/bash

npm install
pm2 start app.js --name="columbus" 
