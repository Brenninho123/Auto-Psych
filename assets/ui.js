function startBuild(target) {

    const log = document.getElementById("log-output");

    log.innerHTML += `> Iniciando build para ${target}...\n`;

    setTimeout(() => {
        log.innerHTML += `> Compilando arquivos...\n`;
    }, 1000);

    setTimeout(() => {
        log.innerHTML += `> Build concluído com sucesso!\n`;
    }, 2500);
}
