#!/bin/sh
version=8e7d7f4

git clone git@github.com:KhronosGroup/glTF.git
cd glTF

git checkout -b build $version
git apply ../cstring-$version.patch
git submodule init
git submodule update

cd COLLADA2GLTF
cmake .
make

