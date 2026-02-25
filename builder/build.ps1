param([string]$target)

if (!$target) {
    Write-Host "Use: .\build.ps1 windows"
    exit
}

Remove-Item -Recurse -Force PsychEngine -ErrorAction Ignore
git clone https://github.com/ShadowMario/FNF-PsychEngine.git
cd PsychEngine

haxelib install flixel -y
haxelib install lime -y
haxelib install openfl -y

haxelib run lime setup

lime build $target -release
