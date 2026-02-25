VERSION=$(date +"%Y.%m.%d.%H%M")
git tag v$VERSION
git push origin v$VERSION