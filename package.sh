
# Get Parameters
info() {
    echo "Builds and packages the application"

    usage
}

usage() {
    echo "usage: package.sh [options]

-a        include admin files
-c        build and include clientapp
-s        include static files
-h        Show this help"
}

UPLOAD_ADMIN=NO
UPLOAD_CLIENTAPP=NO
UPLOAD_STATIC=NO

while getopts "achs" opt; do
    case $opt in
        a)
            UPLOAD_ADMIN=YES
            ;;
        c)
            UPLOAD_CLIENTAPP=YES
            ;;
        s)
            UPLOAD_STATIC=YES
            ;;
        h)
            info
            exit 0
            ;;
        \?)
            echo "Use -h for help"
            exit 1
            ;;
    esac
done

# make build output directory
rm -rf build
mkdir build

# build clientapp
if [ "$UPLOAD_CLIENTAPP" == "YES" ]; then
  cd clientapp
  bun run build
  bun prerender.js
  cd ..
fi

# copy build output to build folder
if [ "$UPLOAD_STATIC" == "YES" ]; then
  cp -r staticfiles/. build
fi

if [ "$UPLOAD_CLIENTAPP" == "YES" ]; then
  cp -r clientapp/dist/* build/
  cp -r clientapp/prerendered/ build/
fi

if [ "$UPLOAD_ADMIN" == "YES" ]; then
  cp -r admin build
fi
