#!/usr/bin/env bash

echo -e "Installing dependencies\n"

cd backend; pip3 install -r requirements.txt; cd -
cd client; npm i; cd -

echo -e "\nTo run:"
echo "1. cd into the client directory"
echo "2. type 'npm run build' to compile"
echo "3. type 'npm start' to run the frontend"
echo "Alternatively, type 'npm run concurrently' while in client directory to run the front and backend"