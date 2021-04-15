cd Backend 
npm install
lsof -ti tcp:8000 | xargs kill
npm run start &
echo "backend server before script has ran\n"
exit 0