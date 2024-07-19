let senhaOculta = true;
function mostrarSenha() {
    if (senhaOculta) {
        document.getElementById("olho").src = "/images/eye-open.svg";
        const senhas = document.querySelectorAll(".senha");
        senhas.forEach((senha) => (senha.type = "text"));
    } else {
        document.getElementById("olho").src = "/images/eye-closed.svg";
        const senhas = document.querySelectorAll(".senha");
        senhas.forEach((senha) => (senha.type = "password"));
    }
    senhaOculta = !senhaOculta;
}
