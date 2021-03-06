import $ from 'jquery';
import './index-ga';
import moment from 'moment';

$('.dropdown-toggle').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(0).fadeIn(100);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(0).fadeOut(100);
});

$(document).ready(function(){
    var pesquisaSelecionada = $("#abaSelecionada").val();
    
    //se nao for a pesquisa de jurisprudencia, esconde botoes da pesquisa jurisprudencia
    if(pesquisaSelecionada != 4){
        $('.botoes-pesquisa-jurisprudencia span').hide();
        $('.pesquisa-jurisprudencia-links-inferiores').hide();            
    }
    
    $('[data-toggle="popover"]').popover({
        container: 'body'
    });

    $('#alto-contraste').click(function() {
        $('body').toggleClass('alto-contraste');
    });
});

moment.locale("pt-BR");    
$(".tmp-dec").html("H&aacute; " + moment().startOf("day").fromNow());    

//--------------------------------
// controle dos botoes de pesquisa da home na versao Desktop

$("#menuPesquisa li span").on("click", function() {
    //Remove os estilos de todas as abas.
    $("#menuPesquisa li span").each(function(index, element) {
        $(this).removeClass("ativo");
    });

    $('.botoes-pesquisa-jurisprudencia span').hide();
    $('.pesquisa-jurisprudencia-links-inferiores').hide();   
    
    //Ativa a aba clicada.
    $(this).addClass("ativo");
    
    var placeholder = "";
    var aba = $(this).attr("id");
    
    switch(aba) {
        case "abaProcesso":
            placeholder = "Digite a classe e número do processo (ex: ADI 100)";
            $("#abaSelecionada").val("3");
            break;
        case "abaJurisprudencia":
            placeholder = "Digite um termo para a pesquisa de jurisprudência...";
            $("#abaSelecionada").val("4");
            $('.botoes-pesquisa-jurisprudencia span').show();
            $('.pesquisa-jurisprudencia-links-inferiores').show();   
            break;
        case "abaNoticias":
            placeholder = "Informe um assunto sobre uma notícia...";
            $("#abaSelecionada").val("2");
            break;
        default:
            placeholder = "Informe o assunto desejado...";
            $("#abaSelecionada").val("6");
            break;
    }
    
    $("#pesquisaPrincipal").val("");
    $("#pesquisaPrincipal").attr("placeholder", placeholder);
    $("#pesquisaPrincipal").focus();
});

// fim do controle dos botoes de pesquisa da home na versao Desktop
//----------------------------------------------------


//--------------------------------
// controle dos botoes de pesquisa da home na versao mobile

$("#menu-pesquisa-mobile").on("change", function() {        
    $('.pesquisa-jurisprudencia-links-inferiores').hide();  
    var placeholder = "";
    var aba = $( "#menu-pesquisa-mobile option:selected" ).data("aba");    
    switch(aba) {
        case "abaProcesso":
            placeholder = "Digite a classe e número do processo";
            $("#abaSelecionada").val("3");
            break;
        case "abaJurisprudencia":
            placeholder = "Digite um termo para a pesquisa de jurisprudência";
            $("#abaSelecionada").val("4");               
            $('.pesquisa-jurisprudencia-links-inferiores').show();  
            break;
        case "abaNoticias":
            placeholder = "Informe um assunto sobre uma notícia";
            $("#abaSelecionada").val("2");
            break;
        default:
            placeholder = "Informe o assunto desejado...";
            $("#abaSelecionada").val("6");
            break;
    }
    
    $("#pesquisaPrincipal").attr("placeholder", placeholder);
    $("#pesquisaPrincipal").focus();
});

// fim do controle dos botoes de pesquisa versao mobile
//----------------------------------------------------

$('.botoes-pesquisa-jurisprudencia span').on('click', function(){
    var search = $('#pesquisaPrincipal').val();
    search = search + ' ' + $(this).data('value') + ' ';
    $('#pesquisaPrincipal').val(search);        
    $("#pesquisaPrincipal").focus();
});

function realizarPesquisa(){
    var assunto = $("#abaSelecionada").val();
    var termoPesquisa = $("#pesquisaPrincipal").val();
    
    if (assunto == "4") {
        location.href = "//stf.jus.br/portal/jurisprudencia/listarConsolidada.asp?base=baseAcordaos&base=baseRepercussao&url=&txtPesquisaLivre=" + termoPesquisa;
    } else {
        location.href = "//stf.jus.br/portal/pesquisa/listarPesquisa.asp?termo=" + termoPesquisa + "&assunto=" + assunto;
    }
}

$("#btnPesquisar").click(function(){
    realizarPesquisa();
});


$("#btn-jurisprudencia-pesquisar").click(function(){    
    var termoPesquisa = $("#pesquisaPrincipal").val();  
    var urlRedirect = 'http://www.stf.jus.br/portal/jurisprudencia/listarConsolidada.asp?url=&txtPesquisaLivre='+termoPesquisa+'&numero=&ministro=&dataInicial=&dataFinal=&tema=&tese=&tipoTese=&orgaoJulgador=&ementa=&nomeLegislacao=&txtAnoLegislacao=N%C3%BAmero&tipoLegislacao1=ART&valorLegislacao1=&tipoLegislacao2=PAR&valorLegislacao2=&tipoLegislacao3=INC&valorLegislacao3=&tipoLegislacao4=LET&valorLegislacao4=&base=baseAcordaos&base=baseRepercussao&base=baseSumulasVinculantes&base=baseSumulas&base=baseMonocraticas&base=basePresidencia&base=baseInformativo&base=baseQuestoes&base=todos';    
    location.href = urlRedirect; 
});

$("#pesquisaPrincipal").keyup(function(e){
    if(e.keyCode == 13) {
        realizarPesquisa();
    }
});

/* Pauta de Julgamento da Home ------------------------------------------------------------------------------------ */

//Usada no ato de clicar sobre um dia no calendário de pauta de julgamento.
function selecionarDataJulgamento(data) {
    ga('send', 'event', 'Página Geral', 'Pauta Julgamento', 'Link calendario');
    location.href = "//stf.jus.br/portal/pauta/listarCalendario.asp?data=" + data;
}

function pesquisarProcessoConstaPauta() {
	var inputProcesso = document.getElementById('pesquisa_pauta');
    var regra = /(\w{2}|\w{4}) \d{2,6}/;

    if (!regra.test(inputProcesso.value)) {
        alert('O número do processo informado é inválido.');
    } else {
		var processo = inputProcesso.value.split(' ');
		var classe = processo[0].trim().toUpperCase();
		var numero = processo[1].trim();

		location.href = "//www.stf.jus.br/portal/pauta/listarProcesso.asp?classe=" + classe + "&argumento=" + numero;
	}
}

function pesquisarProcessoPauta(event) {
    if (event.keyCode == 13) {
        pesquisarProcessoConstaPauta();
    }
}

$("#btnPesquisarProcessoPauta").click(function(){
	pesquisarProcessoConstaPauta();
});

$("#pesquisa_pauta").keyup(function(e){
    if(e.keyCode == 13) {
        pesquisarProcessoConstaPauta();
    }
});


/* ---------------------------------------------------------------------------------------------------------------- */