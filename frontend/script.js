document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const nomeDono = document.getElementById("nome_dono").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const endereco = document.getElementById("endereço").value.trim();
        const nomePet = document.getElementById("nome_pet").value.trim();
        const especie = document.getElementById("especie").value.trim();
        const raca = document.getElementById("raca").value.trim();
        const dataNascimento = document.getElementById("data_nascimento").value;
        const observacoes = document.getElementById("observacoes").value.trim();
        // Pegando os valores dos inputs

        if (cpf.length !== 11) {
            alert("O CPF deve ter 11 números!");
            return;
        }
        // Validações simples

        if (telefone.length < 10 || telefone.length > 11) {
            alert("O telefone deve ter 10 ou 11 números!");
            return;
        }

        if (!email.includes("@")) {
            alert("Digite um e-mail válido!");
            return;
        }

        console.log("Cadastro realizado com sucesso!");
        console.log("Dono do Pet:");
        console.log({ nomeDono, cpf, email, telefone, endereco });
        console.log("Pet:");
        console.log({ nomePet, especie, raca, dataNascimento, observacoes });
        // Para mostrar os dados no console


        alert("Cadastro de " + nomeDono + " e seu pet " + nomePet + " realizado com sucesso!");
    // Para o alertar para o usuário
    });
});
