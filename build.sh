# First, check for a config
if [ ! -f .config ]
  then echo "Run config.sh first!"
  exit
fi

ROOT=$(sed '1q;d' .config)
DEST=$(sed '2q;d' .config)

if [ -d ${DEST} ]
  then rm -rf ${DEST}/*
else
  mkdir ${DEST}
fi

if [ -d app/data ]
  then rm -rf app/data/*
else
  mkdir app/data
fi

echo "compile & process scss"
cd app
compass compile
cd css
postcss -u autoprefixer -o style.css style.css
cd ../..

echo "init data"
cp app/rawdata/ability.poke app/data/ability.json
node prepdata.js

echo "fix options"
cp app/raw-index.html app/index.html
sed -i "s/\$ROOT/$(echo ${ROOT} | sed 's/\//\\\//g')/g" app/index.html
cp app/build/raw-app.build.js app/build/app.build.js
sed -i "s/\$DEST/$(echo ${DEST} | sed 's/\//\\\//g')/g" app/build/app.build.js

echo "compiling..."
r.js -o app/build/app.build.js

cd ${DEST}
echo "adding timestamp to cache manifest"
echo "#$(date)" >> porysearch.appcache

echo "cleaning up"
rm -rf bower.json build.txt config.rb raw-index.html .bowerrc build/ rawdata/ sass/ .sass-cache/ js/app.js js/backbone.localStorage-min.js js/event.js js/router.js js/collections/ js/models/ js/templates/ js/vendor/ js/views/
