rm ./../static/$1/bundle.js

cd $1

npm run build

mv dist/bundle.js ./../../static/plugins/$1/bundle.js

cd ..