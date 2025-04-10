function atualizarGasto() {
    // Obtém o dia e o valor do gasto
    const diaSelecionado = document.getElementById("dia").value;
    const valorGasto = parseFloat(document.getElementById("gasto").value);

    // Verifica se o valor é válido
    if (isNaN(valorGasto)) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    // Atualiza a tabela com o novo gasto
    const linhas = document.querySelectorAll("#main-table tr");
    for (let linha of linhas) {
        const celulaDia = linha.cells[0];
        if (celulaDia && celulaDia.textContent === diaSelecionado) {
            const celulaGasto = linha.cells[1];
            celulaGasto.textContent = `R$ ${valorGasto.toFixed(2).replace(".", ",")}`;
            break;
        }
    }

    // Recalcula a média
    calcularMediaGastos();
}

function calcularMediaGastos() {
    const gastosDiarios = document.querySelectorAll("#main-table tr td:nth-child(2)");

    let totalGastos = 0;
    let quantidadeDias = 0;

    gastosDiarios.forEach(cell => {
        const valor = parseFloat(cell.textContent.replace("R$ ", "").replace(",", "."));
        if (!isNaN(valor)) {
            totalGastos += valor;
            quantidadeDias++;
        }
    });

    const media = quantidadeDias > 0 ? totalGastos / quantidadeDias : 0;
    document.getElementById("average-value").textContent = media.toFixed(2).replace(".", ",");
}

window.onload = calcularMediaGastos;