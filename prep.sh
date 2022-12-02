#!/bin/bash

#
# Prep for today's challenge. You'll need to grab the session cookie from the
# browser and put it into .cookies.txt for authentication.
#

# Puzzles are released at midnight Eastern time
export TZ=America/New_York

year=$(date +%Y)
day=$(date +%d)
input=./src/day${day}.txt

if test -e src/day${day}.rs; then
  echo "day${day}.rs already exists" >&2
  exit 1
fi

set -ex
curl \
  --output ${input} \
  --fail \
  --cookie .cookies.txt \
  https://adventofcode.com/${year}/day/$((10#${day}))/input

head ${input}

cat <<EOF > src/day${day}.js
EOF

cat <<EOF > src/day${day}.spec.js
EOF
