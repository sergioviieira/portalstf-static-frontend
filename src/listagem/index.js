import style from '../../assets/scss/secoes/listagem/listagem.scss';

import $ from 'jquery';
import moment from 'moment';
import URI from 'urijs';

//import 'jquery-ui/themes/base/core.css';
//import 'jquery-ui/themes/base/theme.css';
//import 'jquery-ui/themes/base/datepicker.css';

$('#data-inicial').datepicker({
    dateFormat: "dd/mm/yy"
});
$('#data-final').datepicker({
    dateFormat: "dd/mm/yy"
});


$('#btn-datepicker-inicial').click(function() {
    $('#data-inicial').datepicker('show');
});

$('#btn-datepicker-final').click(function() {
    $('#data-final').datepicker('show');
});

$('#btn-add-inicial').click(function() {
    var dataInicial = $('#data-inicial').datepicker('getDate');
    if (dataInicial) {
        var dataInicialFormatada = moment(dataInicial).format("DD/MM/YYYY");
        $('#data-inicial').datepicker('setDate');
        var url = new URI(window.location.href);
        url.removeQuery("dataDe");
        url.addQuery("dataDe", dataInicialFormatada);
        url.removeQuery("paginaAtual");
        window.location.href = url.toString();
    }
});

$('#btn-add-final').click(function() {
    var dataFinal = $('#data-final').datepicker('getDate');
    if (dataFinal) {
        var dataFinalFormatada = moment(dataFinal).format("DD/MM/YYYY");
        $('#data-final').datepicker('setDate');
        var url = new URI(window.location.href);
        url.removeQuery("dataA");
        url.addQuery("dataA", dataFinalFormatada);
        url.removeQuery("paginaAtual");
        window.location.href = url.toString();
    }
});

$('.paginacao-ir-para-pagina').click(function () {
    var pagina = parseInt($(this).attr("data-pagina"));
    var url = new URI(window.location.href);
    url.removeQuery("paginaAtual");
    url.addQuery("paginaAtual", pagina);
    window.location.href = url.toString();
});

$('#paginacao-pagina-anterior').click(function() {
    var url = new URI(window.location.href);
    var paginaAtual = url.query(true).paginaAtual;
    if (paginaAtual > 1) {
        paginaAtual--;
        url.removeQuery("paginaAtual");
        url.addQuery("paginaAtual", paginaAtual);
        window.location.href = url.toString();
    }
});

$('#paginacao-proxima-pagina').click(function() {
    if (!$(this).closest('li').hasClass("disabled")) {
        var url = new URI(window.location.href);
        var paginaAtual = url.query(true).paginaAtual;
        if (!paginaAtual) paginaAtual = 1;
        paginaAtual++;
        url.removeQuery("paginaAtual");
        url.addQuery("paginaAtual", paginaAtual);
        window.location.href = url.toString();
    }
});