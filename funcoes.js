function f(j, n) {
	return (j * Math.pow((1 + j), n)) / (Math.pow((1 + j), n) - 1);
}

function calcular(){
	//Pegando elementos do HTML
	var inMeses = document.getElementById("inMeses");
	var inJuros = document.getElementById("inJuros");
	var inParcela = document.getElementById("inParcela");
	var inFinanciado = document.getElementById("inFinanciado");
	var outResposta = document.getElementById("outResposta");

	//carregando variáveis
	var meses = Number(inMeses.value.replace(",", "."));
	var juros = Number(inJuros.value.replace(",", ".")) / 100;
	var parcela = Number(inParcela.value.replace(",", "."));
	var financiado = Number(inFinanciado.value.replace(",", "."));
	var contagemVar = 0;
	var fator;
	var limitParcela = 10000; // limite maximo de parcela

	if (isNaN(meses)) {
		alert("O numero de meses é um valor inválido");
		return;
	}
	if (isNaN(juros)) {
		alert("O valor do juros é um valor inválido");
		return;
	}
	if (isNaN(parcela)) {
		alert("O valor da parcela é um valor inválido");
		return;
	}
	if (isNaN(financiado)) {
		alert("O valor do total financiado é um valor inválido");
		return;
	}

	// conta quantas variaveis estão zeradas
	contagemVar += meses != 0 ? 1 : 0;
	contagemVar += juros != 0 ? 1 : 0;
	contagemVar += parcela != 0 ? 1 : 0;
	contagemVar += financiado != 0 ? 1 : 0;
	if (contagemVar != 3) {
		alert("Apenas uma variavel deve estar vazia");
		return;
	}

	if (!Number.isInteger(meses)) {
		alert("O numero de meses precisa ser um numero inteiro");
		return;
	}

	if (meses != 0 && juros != 0) {
		fator = f(juros, meses);
	} else {
		fator = parcela / financiado;
	}

	if (meses == 0) {
		fator = parcela / financiado;
		var aux = 1;
		if (parcela <= juros * financiado){
			alert("O valor da parcela é menor que o juros, portanto a divida NUNCA será paga");
			inMeses.value = "INFINITO";
			return;
		}
		while (Math.abs(aux - meses) > 0.000001 && meses < limitParcela){
			aux = meses;
			meses = Math.log((juros * Math.pow((1 + juros), meses) + fator) / fator) / Math.log(1 + juros); // Fixed-Point Iteration
		}

		if (meses.toFixed(4) != meses.toFixed(0)){
			alert("Atenção. O numero de parcelas calculadas não é um numero inteiro");
		}

		if (limitParcela <= meses){
			inMeses.value = "Valor acima do permitido";
			return;

		}

		inMeses.value = meses.toFixed(4);
		return;

	} else if (juros == 0) {
		juros = 1;
		fator = parcela / financiado;
		var aux = 0;
		while (Math.abs(aux - juros) > 0.000001){
			aux = juros;
			juros = fator * juros / f(juros, meses); // Fixed-Point Iteration
		}
		inJuros.value = (100 * juros).toFixed(4);
		return;

	} else if (parcela == 0) {
		parcela = financiado * fator;
		inParcela.value = parcela.toFixed(2);
		return;

	} else {
		financiado = parcela / fator;
		inFinanciado.value = financiado.toFixed(2);
		return;

	}

	return;
}

function limpar() {
	//Pegando elementos do HTML
	var inMeses = document.getElementById("inMeses");
	var inJuros = document.getElementById("inJuros");
	var inParcela = document.getElementById("inParcela");
	var inFinanciado = document.getElementById("inFinanciado");
	var outResposta = document.getElementById("outResposta");

	// limpando variaveis
	inMeses.value = "";
	inJuros.value = "";
	inParcela.value = "";
	inFinanciado.value = "";
	outResposta.textContent = "";

	inMeses.focus();
	return;
}

// main do programa
var btCalcular = document.getElementById("btCalcular");
btCalcular.addEventListener("click", calcular);

var btLimpar = document.getElementById("btLimpar");
btLimpar.addEventListener("click", limpar);