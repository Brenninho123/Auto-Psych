const express = require('express');
const { exec } = require('child_process');
const app = express();

app.post('/build', (req, res) => {
    exec("docker run psych-ultra ./build.sh windows",
        (err, stdout, stderr) => {
            if (err) return res.send("Erro");
            res.send("Build iniciado!");
        });
});

app.listen(3000);
