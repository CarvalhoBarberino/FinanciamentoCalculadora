function calcular(){
	//Pegando elementos do HTML
	var inNome = document.getElementById("inNome");
	var rbMasculino = document.getElementById("rbMasculino");
	var rbFeminino = document.getElementById("rbFeminino");
	var inAltura = document.getElementById("inAltura");
	var outResposta = document.getElementById("outResposta");

	//carregando variáveis
	var nome = inNome.value.trim();
	var isMasculino = rbMasculino.checked;
	var isFeminino = rbFeminino.checked;
	var altura = Number(inAltura.value);

	if (nome == "") {
		alert("Preencha seu nome");
		inNome.focus();
		return;
	}

	if (isMasculino == false && isFeminino == false) {
		alert("Informe seu sexo");
		return;
	}

	if (altura == 0 || isNaN(altura)) {
		alert("Informe sua altura");
		inAltura.focus();
		return;
	}

	if (isMasculino) {
		var peso = 22 * Math.pow(altura, 2);
	} else {
		var peso = 21 * Math.pow(altura, 2);
	}

	outResposta.textContent = nome + ": Seu peso ideal é " + peso.toFixed(3) + " Kg";
	return;
}

function limpar() {
	//Pegando elementos do HTML
	var inNome = document.getElementById("inNome");
	var rbMasculino = document.getElementById("rbMasculino");
	var rbFeminino = document.getElementById("rbFeminino");
	var inAltura = document.getElementById("inAltura");
	var outResposta = document.getElementById("outResposta");

	inNome.value = "";
	rbMasculino.checked = false;
	rbFeminino.checked = false;
	inAltura.value = "";
	outResposta.textContent = "";
	inNome.focus();

	return;
}

var btCalcular = document.getElementById("btCalcular");
btCalcular.addEventListener("click", calcular);

var btLimpar = document.getElementById("btLimpar");
btLimpar.addEventListener("click", limpar)