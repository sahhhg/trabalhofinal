import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
const porta = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'eslepsempresempresempre',
    resave: false,
    saveUninitialized: true
}));

function verificarLogin(req, res, next) {
    if (!req.session.user) {
        return res.send({ processo: false, data: "Usuário não logado!" });
    }
    next();
}

let equipes = [];

function telaLogin() {
    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Login</title>
            <style>
                body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #1b2735, #090a0f);
    font-family: "Segoe UI", sans-serif;
    color: #fff;
    min-height: 100vh;
}

.page-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    width: 90%;
    max-width: 500px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 0 25px rgba(0,0,0,0.3);
    animation: fadeUp .5s ease;
    margin: 40px auto;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

h1, h2 {
    text-align: center;
    margin-bottom: 15px;
    font-weight: 600;
    color: #7ab8ff;
}

form label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #d2e6ff;
}

form input, form select {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border-radius: 8px;
    background: #10141b;
    border: 1px solid #2f3b52;
    color: #fff;
    transition: .2s;
}

form input:focus, form select:focus {
    border-color: #3b82f6;
    outline: none;
    transform: scale(1.02);
}

button,
a.menu-btn,
form button {
    width: 100%;
    margin-top: 15px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #3b82f6;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: .2s;
    text-decoration: none;
    text-align: center;
    display: inline-block;
}

button:hover,
a.menu-btn:hover {
    background: #1e3fa8;
    transform: scale(1.03);
}

.list-box {
    width: 90%;
    max-width: 600px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.08);
    border-left: 4px solid #3b82f6;
    border-radius: 8px;
    margin: 10px auto;
    animation: fadeUp .5s ease;
}

a {
    color: #90c9ff;
    text-decoration: none;
}

a:hover {
    color: #fff;
}
            </style>
        </head>
        <body>
        <div class="container">
            <h1>Login</h1>

            <form id="formLogin" method="POST" action="/login">
                <label>Usuário:</label>
                <input type="text" name="usuario" required>

                <label>Senha:</label>
                <input type="password" name="senha" required>

                <button type="submit">Entrar</button>
            </form>
        </div>

        <script>
            const formLogin = document.getElementById('formLogin');
            formLogin.addEventListener('submit', function(e){
                e.preventDefault();
                this.submit(); 
            });
        </script>

        </body>
        </html>
    `;
}


function telaCadastroEquipe() {
    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro Equipe</title>
            <style>
                body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #1b2735, #090a0f);
    font-family: "Segoe UI", sans-serif;
    color: #fff;
    min-height: 100vh;
}

.page-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    width: 90%;
    max-width: 500px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 0 25px rgba(0,0,0,0.3);
    animation: fadeUp .5s ease;
    margin: 40px auto;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

h1, h2 {
    text-align: center;
    margin-bottom: 15px;
    font-weight: 600;
    color: #7ab8ff;
}

form label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #d2e6ff;
}

form input, form select {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border-radius: 8px;
    background: #10141b;
    border: 1px solid #2f3b52;
    color: #fff;
    transition: .2s;
}

form input:focus, form select:focus {
    border-color: #3b82f6;
    outline: none;
    transform: scale(1.02);
}

button,
a.menu-btn,
form button {
    width: 100%;
    margin-top: 15px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #3b82f6;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: .2s;
    text-decoration: none;
    text-align: center;
    display: inline-block;
}

button:hover,
a.menu-btn:hover {
    background: #1e3fa8;
    transform: scale(1.03);
}

.list-box {
    width: 90%;
    max-width: 600px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.08);
    border-left: 4px solid #3b82f6;
    border-radius: 8px;
    margin: 10px auto;
    animation: fadeUp .5s ease;
}

a {
    color: #90c9ff;
    text-decoration: none;
}

a:hover {
    color: #fff;
}
            </style>
        </head>

        <body>
        <div class="container">
            <h1>Cadastrar Equipe</h1>

            <form id="formEquipe" method="POST" action="/equipes">
                <label>Nome da equipe:</label>
                <input type="text" name="nome" required>

                <label>Nome do capitão:</label>
                <input type="text" name="capitao" required>

                <label>Telefone/WhatsApp:</label>
                <input type="text" name="contato" required>

                <button type="submit">Cadastrar</button>
            </form>

            <a href="/inicio">Voltar ao Menu</a>
        </div>

        <script>
            const formEquipe = document.getElementById('formEquipe');
            formEquipe.addEventListener('submit', function(e){
               
            });
        </script>

        </body>
        </html>
    `;
}

function telaMenu(req) {
    return `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Menu</title>
                <style>
                    body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #1b2735, #090a0f);
    font-family: "Segoe UI", sans-serif;
    color: #fff;
    min-height: 100vh;
}

.page-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    width: 90%;
    max-width: 500px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 0 25px rgba(0,0,0,0.3);
    animation: fadeUp .5s ease;
    margin: 40px auto;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

h1, h2 {
    text-align: center;
    margin-bottom: 15px;
    font-weight: 600;
    color: #7ab8ff;
}

form label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #d2e6ff;
}

form input, form select {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border-radius: 8px;
    background: #10141b;
    border: 1px solid #2f3b52;
    color: #fff;
    transition: .2s;
}

form input:focus, form select:focus {
    border-color: #3b82f6;
    outline: none;
    transform: scale(1.02);
}

button,
a.menu-btn,
form button {
    width: 100%;
    margin-top: 15px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #3b82f6;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: .2s;
    text-decoration: none;
    text-align: center;
    display: inline-block;
}

button:hover,
a.menu-btn:hover {
    background: #1e3fa8;
    transform: scale(1.03);
}

.list-box {
    width: 90%;
    max-width: 600px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.08);
    border-left: 4px solid #3b82f6;
    border-radius: 8px;
    margin: 10px auto;
    animation: fadeUp .5s ease;
}

a {
    color: #90c9ff;
    text-decoration: none;
}

a:hover {
    color: #fff;
}
                </style>
            </head>

            <body>
                <div class="container">
                    <h1>Menu</h1>

                    <p><strong>Último acesso:</strong> ${req.cookies.ultimoAcesso || "Não registrado"}</p>

                    <a href="/cadastro-equipes">Cadastro de Equipes</a><br>
                    <a href="/cadastro-jogador">Cadastro de Jogadores</a><br>
                    <a href="/listar-equipes">Listar Equipes</a><br>
                    <a href="/listar-jogadores">Listar Jogadores</a><br><br>

                    <a style="color:red" href="/logout">Logout</a>
                </div>
            </body>
            </html>
        `
}

function telaCadastroJogador() {
    let options = equipes.map(eq => `<option value="${eq.id}">${eq.nome}</option>`).join("");

    return `
    <!DOCTYPE html>
    <html lang="pt-BR">

    <head>
        <meta charset="UTF-8">
        <title>Cadastro Jogador</title>
        <style>
            body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #1b2735, #090a0f);
    font-family: "Segoe UI", sans-serif;
    color: #fff;
    min-height: 100vh;
}

.page-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    width: 90%;
    max-width: 500px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 0 25px rgba(0,0,0,0.3);
    animation: fadeUp .5s ease;
    margin: 40px auto;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

h1, h2 {
    text-align: center;
    margin-bottom: 15px;
    font-weight: 600;
    color: #7ab8ff;
}

form label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #d2e6ff;
}

form input, form select {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border-radius: 8px;
    background: #10141b;
    border: 1px solid #2f3b52;
    color: #fff;
    transition: .2s;
}

form input:focus, form select:focus {
    border-color: #3b82f6;
    outline: none;
    transform: scale(1.02);
}

button,
a.menu-btn,
form button {
    width: 100%;
    margin-top: 15px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #3b82f6;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: .2s;
    text-decoration: none;
    text-align: center;
    display: inline-block;
}

button:hover,
a.menu-btn:hover {
    background: #1e3fa8;
    transform: scale(1.03);
}

.list-box {
    width: 90%;
    max-width: 600px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.08);
    border-left: 4px solid #3b82f6;
    border-radius: 8px;
    margin: 10px auto;
    animation: fadeUp .5s ease;
}

a {
    color: #90c9ff;
    text-decoration: none;
}

a:hover {
    color: #fff;
}
        </style>
    </head>

    <body>
    <div class="container">
        <h1>Cadastrar Jogador</h1>

        <form id="formJogador" method="POST">
            <label>Nome:</label>
            <input type="text" name="nome" required>

            <label>Nickname:</label>
            <input type="text" name="nick" required>

            <label>Função:</label>
            <select name="funcao" required>
                <option value="">Selecione...</option>
                <option value="top">Top</option>
                <option value="jungle">Jungle</option>
                <option value="mid">Mid</option>
                <option value="atirador">Atirador</option>
                <option value="suporte">Suporte</option>
            </select>

            <label>Elo:</label>
            <input type="text" name="elo" required>

            <label>Gênero:</label>
            <select name="genero" required>
                <option value="">Selecione...</option>
                <option>M</option>
                <option>F</option>
                <option>Outro</option>
            </select>

            <label>Equipe:</label>
            <select name="idEquipe" id="idEquipe" required>
                ${options}
            </select>

            <button type="submit">Cadastrar</button>
        </form>

        <a href="/inicio">Voltar ao Menu</a>
    </div>

    <script>
        const form = document.getElementById('formJogador');
        form.addEventListener('submit', function(e){
            e.preventDefault();
            const idEquipe = document.getElementById('idEquipe').value;
            this.action = '/equipes/jogadores/' + idEquipe;
            this.submit();
        });
    </script>
    </body>
    </html>
    `;
}

function telaListaEquipes() {
    let blocos = equipes.map(e => `
        <div class="list-box">
            <h3>${e.nome} <small>(Capitão: ${e.capitao})</small></h3>

            ${e.jogadores.length > 0 ?
            e.jogadores.map(j => `
                <p><b>${j.nome}</b> (${j.nick}) - ${j.funcao}</p>
            `).join("") :
            "<p><em>Sem jogadores cadastrados</em></p>"}

            <button type="button" onclick="document.getElementById('editar-${e.id}').style.display='block'; this.style.display='none';">
                Editar Equipe
            </button>

            <form id="editar-${e.id}" method="POST" action="/equipes/editar/${e.id}" style="display:none; margin-top:15px;">
                <label>Nome da Equipe:</label>
                <input type="text" name="nome" value="${e.nome}" required>

                <label>Capitão:</label>
                <input type="text" name="capitao" value="${e.capitao}" required>

                <label>Contato do Capitão:</label>
                <input type="text" name="contato" value="${e.contatoCapitao || ''}" required>

                <button type="submit">Salvar Alterações</button>
            </form>

            <form method="POST" action="/equipes/delete/${e.id}" onsubmit="return confirm('Deseja realmente excluir esta equipe?');" style="margin-top:10px;">
                <button type="submit">Excluir Equipe</button>
            </form>
        </div>
    `).join("");

    return `
        <!DOCTYPE html>
        <html lang="pt-BR">

        <head>
            <meta charset="UTF-8">
            <title>Equipes</title>
            <style>
            body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #1b2735, #090a0f);
    font-family: "Segoe UI", sans-serif;
    color: #fff;
    min-height: 100vh;
}

.page-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    width: 90%;
    max-width: 500px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 0 25px rgba(0,0,0,0.3);
    animation: fadeUp .5s ease;
    margin: 40px auto;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

h1, h2 {
    text-align: center;
    margin-bottom: 15px;
    font-weight: 600;
    color: #7ab8ff;
}

form label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #d2e6ff;
}

form input, form select {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border-radius: 8px;
    background: #10141b;
    border: 1px solid #2f3b52;
    color: #fff;
    transition: .2s;
}

form input:focus, form select:focus {
    border-color: #3b82f6;
    outline: none;
    transform: scale(1.02);
}

button,
a.menu-btn,
form button {
    width: 100%;
    margin-top: 15px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #3b82f6;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: .2s;
    text-decoration: none;
    text-align: center;
    display: inline-block;
}

button:hover,
a.menu-btn:hover {
    background: #1e3fa8;
    transform: scale(1.03);
}

.list-box {
    width: 90%;
    max-width: 600px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.08);
    border-left: 4px solid #3b82f6;
    border-radius: 8px;
    margin: 10px auto;
    animation: fadeUp .5s ease;
}

a {
    color: #90c9ff;
    text-decoration: none;
}

a:hover {
    color: #fff;
}
            </style>
        </head>

        <body>
            <div class="container">
                <h1>Equipes Cadastradas</h1>
                ${blocos}
                <br>
                <a href="/inicio">Voltar ao Menu</a>
            </div>
        </body>
        </html>
    `;
}

function telaListaJogadores() {
    let blocos = equipes.map(eq =>
        eq.jogadores.map(j => {
            let options = equipes.map(e => `<option value="${e.id}" ${e.id === eq.id ? "selected" : ""}>${e.nome}</option>`).join("");

            return `
            <div class="list-box">
                <p><b>${j.nome}</b> (${j.nick}) - ${j.funcao}<br>
                Equipe: ${eq.nome}</p>

                <button type="button" onclick="document.getElementById('editar-${j.id}').style.display='block'; this.style.display='none';">Editar</button>

                <form id="editar-${j.id}" method="POST" action="/equipes/jogadores/editar/${j.id}" style="display:none; margin-top:15px;">
                    <label>Nome:</label>
                    <input type="text" name="nome" value="${j.nome}" required>

                    <label>Nickname:</label>
                    <input type="text" name="nick" value="${j.nick}" required>

                    <label>Função:</label>
                    <select name="funcao" required>
                        <option value="top" ${j.funcao === 'top' ? 'selected' : ''}>Top</option>
                        <option value="jungle" ${j.funcao === 'jungle' ? 'selected' : ''}>Jungle</option>
                        <option value="mid" ${j.funcao === 'mid' ? 'selected' : ''}>Mid</option>
                        <option value="atirador" ${j.funcao === 'atirador' ? 'selected' : ''}>Atirador</option>
                        <option value="suporte" ${j.funcao === 'suporte' ? 'selected' : ''}>Suporte</option>
                    </select>

                    <label>Elo:</label>
                    <input type="text" name="elo" value="${j.elo}" required>

                    <label>Gênero:</label>
                    <select name="genero" required>
                        <option value="M" ${j.genero === 'M' ? 'selected' : ''}>M</option>
                        <option value="F" ${j.genero === 'F' ? 'selected' : ''}>F</option>
                        <option value="Outro" ${j.genero === 'Outro' ? 'selected' : ''}>Outro</option>
                    </select>

                    <label>Equipe:</label>
                    <select name="idEquipe" required>
                        ${options}
                    </select>

                    <button type="submit">Salvar Alterações</button>
                </form>

                <form method="POST" action="/equipes/jogadores/delete/${j.id}" onsubmit="return confirm('Deseja realmente excluir este jogador?');" style="margin-top:10px;">
                    <button type="submit">Excluir</button>
                </form>
            </div>
            `;
        }).join("")
    ).join("");

    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Jogadores</title>
            <style>
            body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #1b2735, #090a0f);
    font-family: "Segoe UI", sans-serif;
    color: #fff;
    min-height: 100vh;
}

.page-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    width: 90%;
    max-width: 500px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 0 25px rgba(0,0,0,0.3);
    animation: fadeUp .5s ease;
    margin: 40px auto;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

h1, h2 {
    text-align: center;
    margin-bottom: 15px;
    font-weight: 600;
    color: #7ab8ff;
}

form label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #d2e6ff;
}

form input, form select {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border-radius: 8px;
    background: #10141b;
    border: 1px solid #2f3b52;
    color: #fff;
    transition: .2s;
}

form input:focus, form select:focus {
    border-color: #3b82f6;
    outline: none;
    transform: scale(1.02);
}

button,
a.menu-btn,
form button {
    width: 100%;
    margin-top: 15px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #3b82f6;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: .2s;
    text-decoration: none;
    text-align: center;
    display: inline-block;
}

button:hover,
a.menu-btn:hover {
    background: #1e3fa8;
    transform: scale(1.03);
}

.list-box {
    width: 90%;
    max-width: 600px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.08);
    border-left: 4px solid #3b82f6;
    border-radius: 8px;
    margin: 10px auto;
    animation: fadeUp .5s ease;
}

a {
    color: #90c9ff;
    text-decoration: none;
}

a:hover {
    color: #fff;
}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Jogadores Cadastrados</h1>
                ${blocos}
                <br>
                <a href="/inicio">Voltar ao Menu</a>
            </div>
        </body>
        </html>
    `;
}

app.get("/", (req, res) => {
    res.send(telaLogin());
});

app.get("/inicio", verificarLogin, (req, res) => {
    res.send(telaMenu(req));
});

app.get("/cadastro-equipes", verificarLogin, (req, res) => {
    res.send(telaCadastroEquipe());
});

app.get("/cadastro-jogador", verificarLogin, (req, res) => {
    res.send(telaCadastroJogador());
});

app.get("/listar-equipes", verificarLogin, (req, res) => {
    res.send(telaListaEquipes());
});

app.get("/listar-jogadores", verificarLogin, (req, res) => {
    res.send(telaListaJogadores());
});

// Rotas 

//Equipes
app.post("/equipes", verificarLogin, (req, res) => {
    let nome = req.body.nome,
        capitao = req.body.capitao,
        contatoCapitao = req.body.contato;

    let id = Date.now().toString();

    if (nome) {
        if (equipes.some(x => x.nome === nome && x.id !== id)) {
            return res.send({
                processo: false,
                data: "Já existe outra equipe com esse nome!"
            });
        }
    }

    if (!capitao) {
        return res.send({
            processo: false,
            data: "O nome do capitão responsável está faltando!"
        });
    }

    if (!contatoCapitao) {
        return res.send({
            processo: false,
            data: "O número do capitão responsável está faltando!"
        });
    }

    contatoCapitao = contatoCapitao.replace(/\D/g, "");

    if (!/^[0-9]{2}(?:[0-9]{8}|[0-9]{9})$/.test(contatoCapitao)) {
        return res.send({
            processo: false,
            data: "O número digitado é inválido!"
        });
    }

    equipes.push({ id: id, nome: nome, capitao: capitao, contatoCapitao: contatoCapitao, jogadores: [] });

    return res.send({ processo: true, data: "Criado com sucesso!" });
});

app.post("/equipes/editar/:id", verificarLogin, (req, res) => {
    const idEquipe = req.params.id;

    let equipe = equipes.find(x => x.id === idEquipe);
    if (!equipe) {
        return res.send({ processo: false, data: "Equipe não encontrada!" });
    }

    let nome = req.body.nome,
        capitao = req.body.capitao,
        contatoCapitao = req.body.contato;

    if (nome == equipe.nome && capitao == equipe.capitao && contatoCapitao == equipe.contatoCapitao) {
        return res.send({ processo: false, data: "Nenhuma informação foi alterada!" });
    }

    if (nome) {
        if (equipes.some(x => x.nome === nome && x.id !== idEquipe)) {
            return res.send({
                processo: false,
                data: "Já existe outra equipe com esse nome!"
            });
        }

        equipe.nome = nome;
    }

    if (capitao) equipe.capitao = capitao;

    if (contatoCapitao) {
        contatoCapitao = contatoCapitao.replace(/\D/g, "");

        equipe.contatoCapitao = contatoCapitao;
    }

    return res.send({ processo: true, data: "Equipe editada com sucesso!" });
});

app.post("/equipes/delete/:id", verificarLogin, (req, res) => {
    const idEquipe = req.params.id;

    const i = equipes.findIndex(x => x.id === idEquipe);

    if (i === -1) {
        return res.send({ processo: false, data: "Equipe não foi encontrada!" });
    }

    equipes.splice(i, 1);

    return res.send({ processo: true, data: "Equipe foi excluída com sucesso!" });
});

app.get("/equipes", verificarLogin, (req, res) => {
    return res.send(equipes);
});

// Jogadores
app.post("/equipes/jogadores/:idEquipe", verificarLogin, (req, res) => {
    const nome = req.body.nome,
        nick = req.body.nick,
        funcao = req.body.funcao,
        elo = req.body.elo,
        genero = req.body.genero,
        idEquipe = req.params.idEquipe;


    const eq = equipes.findIndex(eq => eq.id === idEquipe);
    if (eq === -1) return res.send({ processo: false, data: "Equipe não encontrada!" });

    if (equipes[eq].jogadores.length >= 5)
        return res.send({ processo: false, data: "Equipe já está cheia de jogadores!" });

    const id = Date.now().toString();
    equipes[eq].jogadores.push({ id, nome, nick, funcao, elo, genero });

    return res.send({ processo: true, data: `Jogador criado com sucesso na equipe ${equipes[eq].nome}!` });
});

//Voltar aqui e pegar os campos para editar depois (não posso esquecer)
app.post("/equipes/jogadores/editar/:id", verificarLogin, (req, res) => {
    const idJogador = req.params.id;
    const nome = req.body.nome,
        nick = req.body.nick,
        funcao = req.body.funcao,
        elo = req.body.elo,
        genero = req.body.genero;

    let equipe = null;
    let jogador = null;

    for (let eq of equipes) {
        const jogadorFor = eq.jogadores.find(x => x.id === idJogador);
        if (jogadorFor) {
            equipe = eq;
            jogador = jogadorFor;
        }
    }

    if (!jogador) {
        return res.send({ processo: false, data: "Jogador não encontrado!" });
    }

    if (nome) jogador.nome = nome;
    if (nick) jogador.nick = nick;
    if (funcao) jogador.funcao = funcao;
    if (elo) jogador.elo = elo;
    if (genero) jogador.genero = genero;

    return res.send({
        processo: true,
        data: `Jogador atualizado com sucesso na equipe ${equipe.nome}!`
    });
});

app.post("/equipes/jogadores/delete/:id", verificarLogin, (req, res) => {
    const idJogador = req.params.id;

    for (let eq of equipes) {
        const index = eq.jogadores.findIndex(j => j.id === idJogador);

        if (index !== -1) {
            eq.jogadores.splice(index, 1);

            return res.send({
                processo: true,
                data: `Jogador excluído com sucesso da equipe ${eq.nome}!`
            });
        }
    }

    return res.send({ processo: false, data: "Jogador não foi encontrado..." });
});

app.post('/login', (req, res) => {
    const usuario = req.body.usuario,
        senha = req.body.senha;

    if (usuario === 'admin' && senha === '12345') {
        req.session.user = usuario;
        const now = new Date().toISOString();
        res.cookie('ultimoAcesso', now, { maxAge: 24 * 60 * 60 * 1000, httpOnly: false });
        return res.send(telaMenu(req));
    } else {
        return res.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="style.css">
                <title>Login</title>
                <style>${styles}</style>
            </head>
            <body>
            <div class="container">
                <h1>Login</h1>
                <p style="color: red;">Credenciais inválidas</p>
                <form method="POST" action="/login">
                    <label>Usuário:</label>
                    <input type="text" name="usuario" required>

                    <label>Senha:</label>
                    <input type="password" name="senha" required>

                    <button type="submit">Entrar</button>
                </form>
            </div>
            </body>
            </html>
        `);
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((erro) => {
        if (erro) {
            return res.send('Erro ao fazer logout');
        }
        res.clearCookie('connect.sid');
        res.clearCookie('ultimoAcesso');
        res.redirect('/');
    });
});

app.listen(porta, () => {
    console.log(`Rodando ${porta}`)
});
