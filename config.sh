#!/bin/sh

echo "======================="
echo "POKESTATS CONFIGURATION"
echo "======================="

if [ -f .config ]
  then rm .config
fi

touch .config

echo "Enter the root directory of the website."
echo "NOTE: This CAN be set to \"/\", but don't be surprised when IE has its problems."
echo -n "> "; read ROOT

echo "Enter the build destination."
echo "NOTE: This path should be absolute."
echo -n "> "; read DEST

echo ${ROOT} >> .config
echo ${DEST} >> .config

echo "Configuration done!"
echo "Run build.sh to build the site."
