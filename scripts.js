function atualizarGasto() {
    // Obtém o dia e o valor do gasto
    const diaSelecionado = document.getElementById("dia").value;
    const valorGasto = parseFloat(document.getElementById("gasto").value);

    // Verifica se o valor é válido
    if (isNaN(valorGasto)) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    // Limpa o campo de input após a inserção
    document.getElementById("gasto").value = "";

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

    // Recalcula tanto a média quanto o total
    calcularTotais();
}

function calcularTotais() {
    const gastosDiarios = document.querySelectorAll("#main-table .gasto-diario");
    
    let totalGastos = 0;
    let quantidadeDiasComGasto = 0;

    // Calcula o total e conta dias com gastos
    gastosDiarios.forEach(cell => {
        const valorTexto = cell.textContent.replace("R$ ", "").replace(",", ".");
        const valor = parseFloat(valorTexto);
        if (!isNaN(valor) && valor > 0) {
            totalGastos += valor;
            quantidadeDiasComGasto++;
        }
    });

    // Atualiza o total semanal
    document.getElementById("total-value").textContent = `R$ ${totalGastos.toFixed(2).replace(".", ",")}`;
    
    // Calcula e atualiza a média (considera 7 dias, mesmo que alguns sejam zero)
    const media = totalGastos / 7;
    document.getElementById("average-value").textContent = media.toFixed(2).replace(".", ",");
}

// Inicializa os cálculos quando a página carrega
window.onload = function() {
    calcularTotais();
    
    // Adiciona evento de tecla para o campo de gasto
    document.getElementById("gasto").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            atualizarGasto();
        }
    });
};