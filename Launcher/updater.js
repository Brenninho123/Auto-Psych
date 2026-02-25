const { exec } = require('child_process');

function launch() {
  exec("PsychEngine.exe");
}

function checkUpdates() {
  exec("node updater_script.js");
}
