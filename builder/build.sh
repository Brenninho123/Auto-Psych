#!/usr/bin/env bash
set -e

CONFIG="builder/config.json"
ENGINE_DIR="PsychEngine"
OUTPUT="build_output"

TARGET=$1

echo "==== PSYCH AUTO BUILDER ===="

if [ -z "$TARGET" ]; then
  echo "Use: ./build.sh <windows|linux|macos|html5|android>"
  exit 1
fi

echo "-- Limpando diretórios"
rm -rf $ENGINE_DIR $OUTPUT
mkdir -p $OUTPUT

echo "-- Clonando engine"
git clone https://github.com/ShadowMario/FNF-PsychEngine.git $ENGINE_DIR
cd $ENGINE_DIR

echo "-- Instalando libs"
haxelib install flixel -y
haxelib install lime -y
haxelib install openfl -y

haxelib run lime setup

echo "-- Compilando $TARGET"
lime build $TARGET -release

echo "-- Copiando build"
cp -r export/* ../$OUTPUT/

echo "==== BUILD FINALIZADO ===="
