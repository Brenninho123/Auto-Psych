FROM haxe:4.3.2

RUN apt update && apt install -y git neko

WORKDIR /app

RUN haxelib install flixel -y
RUN haxelib install lime -y
RUN haxelib install openfl -y

CMD ["bash"]
