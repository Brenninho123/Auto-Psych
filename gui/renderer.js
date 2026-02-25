const { exec } = require('child_process');

function build(target) {
  exec(`bash ../builder/build.sh ${target}`, (err, stdout, stderr) => {
    if (err) {
      alert("Erro!");
      return;
    }
    alert("Build concluído!");
  });
}
