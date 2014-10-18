rm -rf dist
rm -rf app/data
mkdir app/data
cp app/rawdata/ability.poke app/data/ability.json
rhino pokemon.js > app/data/pokemon.json
rhino move.js > app/data/move.json
r.js -o app/build/app.build.js
cd dist
rm -rf build build.txt js/views js/vendor bower_components js/foundation js/backbone.localStorage-min.js js/foundation.min.js js/models js/collections js/views js/router.js fbower_components sass config.rb rawdata
