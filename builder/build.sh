#!/usr/bin/env bash
set -e

TARGET=$1
CACHE_DIR="$HOME/.psych_cache"
ENGINE_DIR="PsychEngine"

if [ -z "$TARGET" ]; then
  echo "Use: ./build.sh windows|linux|macos|html5|android"
  exit 1
fi

echo "=== PSYCH ULTRA BUILDER ==="

mkdir -p $CACHE_DIR

if [ ! -d "$ENGINE_DIR" ]; then
  echo "-- Clonando engine..."
  git clone https://github.com/ShadowMario/FNF-PsychEngine.git
fi

cd $ENGINE_DIR

echo "-- Restaurando cache haxelib"
haxelib setup $CACHE_DIR

echo "-- Instalando dependências"
haxelib install flixel -y
haxelib install lime -y
haxelib install openfl -y

echo "-- Buildando $TARGET"
lime build $TARGET -release -final

echo "=== BUILD COMPLETO ==="