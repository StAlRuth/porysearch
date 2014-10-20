# First, check for a config
if [ ! -f .config ]
  then echo "Run config.sh first!"
  exit
fi

ROOT=$(sed '1q;d' .config)
DEST=$(sed '2q;d' .config)

rm -rf ${DEST}
rm -rf app/data

echo "compile scss"
cd app
compass compile
cd ..

echo "init data"
mkdir app/data
cp app/rawdata/ability.poke app/data/ability.json
rhino pokemon.js > app/data/pokemon.json
rhino move.js > app/data/move.json

echo "fix options"
cp app/raw-index.html app/index.html
sed -i "s/\$ROOT/$(echo ${ROOT} | sed 's/\//\\\//g')/g" app/index.html
cp app/build/raw-app.build.js app/build/app.build.js
sed -i "s/\$DEST/$(echo ${DEST} | sed 's/\//\\\//g')/g" app/build/app.build.js

echo "compiling..."
r.js -o app/build/app.build.js

echo "cleaning up"
cd ${DEST}
#TODO: Add more things to delete from ${DEST} here.
rm -rf build build.txt js/views js/vendor bower_components js/foundation js/backbone.localStorage-min.js js/foundation.min.js js/models js/collections js/views js/router.js fbower_components sass config.rb rawdata js/templates raw-index.html bower.json
