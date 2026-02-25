# 🚀 Auto-Psych

Auto-Psych é um sistema completo de compilação automática para a Psych Engine.

Ele automatiza builds locais, Docker, CI/CD, instaladores, launcher e painel web.

Projeto criado para facilitar a vida de desenvolvedores de mods da Psych Engine.

---

# 📦 Funcionalidades

- ✅ Builder automático (Windows / Linux / macOS / HTML5 / Android)
- ✅ Interface Web Dashboard
- ✅ Launcher de Mods
- ✅ Sistema de Logs
- ✅ Docker Build Isolado
- ✅ GitHub Actions (CI/CD)
- ✅ Release Automática
- ✅ Estrutura modular e organizada
- ✅ Preparado para Build Server Online

---

# 📁 Estrutura do Projeto

- Auto-Psych/ │ ├── index.html ├── assets/ │   ├── style.css │   ├── main.js │   └── ui.js │ ├── builder/ ├── docker/ ├── launcher/ ├── installer/ ├── .github/workflows/ └── README.md

---

# 🖥 Requisitos

Antes de usar o Builder, instale:

- Haxe 4.3+
- Lime
- OpenFL
- HaxeFlixel
- Git
- Node.js (para GUI)
- Docker (opcional)

Instalação básica das libs:
-haxelib install flixel 
-haxelib install lime 
-haxelib install openfl 
-haxelib run lime setup

---

# ⚙ Como usar o Builder

## Linux / macOS
- ./builder/build.sh windows ./builder/build.sh linux ./builder/build.sh android

## Windows (PowerShell)
- .\builder\build.ps1 windows

---

# 🐳 Usando Docker

Build da imagem:
docker build -t auto-psych docker/

Executar container:
- docker run -it auto-psych

---

# 🌐 Usando o Dashboard Web

1. Abra `index.html`
2. Navegue pelas seções:
   - Dashboard
   - Builder
   - Launcher
   - Docker
   - CI/CD
3. Execute builds pelo painel

Você também pode publicar no GitHub Pages.

---

# 🤖 CI/CD Automático

O projeto já inclui GitHub Actions.

Sempre que criar uma tag:
- git tag v1.0.0 git push origin v1.0.0

→ O GitHub compila automaticamente  
→ Gera artefatos  
→ Cria release  

---

# 📦 Instalador Automático

Utiliza Inno Setup para gerar instaladores `.exe`.

Arquivos estão na pasta:
- installer/

---

# 🔥 Futuras Expansões

- Build Server Online
- Auto Update no jogo
- Launcher com verificação de versão
- Sistema estilo Steam
- CDN para distribuição
- Login e autenticação
- Multi-mod builder simultâneo

---

# 📜 Licença

Uso livre para projetos pessoais e mods.
Verifique a licença da Psych Engine antes de redistribuir builds comerciais.

---

# 👨‍💻 Autor

Desenvolvido por Brenninho123.

---

# ⭐ Contribuição

Pull requests são bem-vindos.
Sugestões e melhorias são sempre aceitas.

---

Auto-Psych — Automatizando a Psych Engine de forma profissional.