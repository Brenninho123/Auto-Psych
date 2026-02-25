function setSection(section) {

    const content = document.getElementById("content");
    const title = document.getElementById("page-title");

    switch(section) {

        case "dashboard":
            title.innerText = "Dashboard";
            content.innerHTML = `
                <div class="card">
                    <h3>Status</h3>
                    <p>Engine pronta para build.</p>
                </div>
                <div class="card">
                    <h3>Versão</h3>
                    <p>v1.0.0</p>
                </div>
            `;
            break;

        case "builder":
            title.innerText = "Builder";
            content.innerHTML = `
                <div class="card">
                    <button onclick="startBuild('windows')">Build Windows</button>
                    <button onclick="startBuild('linux')">Build Linux</button>
                    <button onclick="startBuild('android')">Build Android</button>
                </div>
            `;
            break;

        case "launcher":
            title.innerText = "Launcher";
            content.innerHTML = `
                <div class="card">
                    <p>Launcher configurado.</p>
                </div>
            `;
            break;

        case "docker":
            title.innerText = "Docker";
            content.innerHTML = `
                <div class="card">
                    <p>Ambiente Docker configurado.</p>
                </div>
            `;
            break;

        case "ci":
            title.innerText = "CI/CD";
            content.innerHTML = `
                <div class="card">
                    <p>GitHub Actions ativo.</p>
                </div>
            `;
            break;
    }
}

setSection("dashboard");
