echo -e "Installing dependencies\n"

npm --prefix client/ install
pip3 install -r backend/requirements.txt --user 

echo -e "\nTo run:"
echo "1. cd into the client directory"
echo "2. type 'npm run build' to compile"
echo "3. type 'npm start' to run"