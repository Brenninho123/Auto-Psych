FROM haxe:4.3.2

RUN apt update && apt install -y git neko curl unzip

RUN mkdir /haxelib
RUN haxelib setup /haxelib

RUN haxelib install flixel -y
RUN haxelib install lime -y
RUN haxelib install openfl -y

WORKDIR /app