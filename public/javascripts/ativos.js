"use strict";
 /* Formatting function for row details - modify as you need */
//Andre Test
// Edit Trade
function fillEditTradeModal(objid, tradeid, date, value, tipo) {
    $('#f3txtid').val(objid);
    $('#f3txttradeid').val(tradeid);
    $('#f3txtdate').val(date);
    $('#f3txtvalor').val(value);
    $('#f3seltipo').val(tipo);
    $('#EditTradeModal').modal('show');
}

console.log("bbbbb");
$(document).ready(function() {
    let results;
        
    // Fazendo Datalist das Classificacoes
    let datalist_1 = document.getElementById("dl_class1");
    let datalist_2 = document.getElementById("dl_class2");
    let datalist_3 = document.getElementById("dl_class3");
    let usedClass = [[],[],[]];
    results.AtivosTable.forEach(
        function(element) {
            try {
                if (!usedClass[0].includes(element.class.c1)) {
                    datalist_1.insertAdjacentHTML('beforeend',  '<option value="'+element.class.c1+'" />');
                    usedClass[0].push(element.class.c1);
                } 
                if (!usedClass[1].includes(element.class.c2)) {
                    datalist_2.insertAdjacentHTML('beforeend',  '<option value="'+element.class.c2+'" />');
                    usedClass[1].push(element.class.c2);
                } 
                if (!usedClass[2].includes(element.class.c3)) {
                    datalist_3.insertAdjacentHTML('beforeend',  '<option value="'+element.class.c3+'" />');
                    usedClass[2].push(element.class.c3);
                } 
            } catch {}
      });
      


    
    
    // Add event listener for opening and closing details
    $('#ativosList tbody').on('click', 'td.details-control', function() {
        var tr = $(this).closest('tr');
        var row = ativosList.row( tr );
 
        if ( row.child.isShown() ) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child( formatTable( row.data() ) ).show();
            tr.addClass('shown');
        }
    });

    // Filling modal Opcoes
    $('#ativosList tbody').on('click', '#btnopcoes', function () {
        $('#OptionsModal').modal('show');
        $('#f2txtativo').val(ativosList.row( $(this).parents('tr') ).data().codigo);
        $('#f2txtid').val(ativosList.row( $(this).parents('tr') ).data()._id);
        $('#f2txtsaldo').val(ativosList.row( $(this).parents('tr') ).data().saldo);
        $('#f2txtunitario').val(ativosList.row( $(this).parents('tr') ).data().unitario);
        $('#f2txtguess').val(ativosList.row( $(this).parents('tr') ).data().retorno);
        $('#f2txtclass01').val(ativosList.row( $(this).parents('tr') ).data().class.c1);
        $('#f2txtclass02').val(ativosList.row( $(this).parents('tr') ).data().class.c2);
        $('#f2txtclass03').val(ativosList.row( $(this).parents('tr') ).data().class.c3);
        
        
    });

    // Filling modal Add Trade
    $('#ativosList tbody').on('click', '#btnaddtrade', function () {
        $('#TradeModal').modal('show');
        $('#txtativo').val(ativosList.row( $(this).parents('tr') ).data().codigo);
        $('#txtid').val(ativosList.row( $(this).parents('tr') ).data()._id);
    });

    //Submiting Add Trade
    $('#btntradesubmit').click(function() {
        if($('#txtdate').val().length < 4) { return throwError($('#txtdate'));}
        if( $('#txtvalor').val() == "" ||  Number($('#txtvalor').val()) == 0 ) {
            return throwError($('#txtvalor'));}
        $('#formNewTrade').submit();
    });

    // Edit Trade
    $('#btnedittradesubmit').click(function() {
        if($('#f3txtdate').val().length < 4) { return throwError($('#f3txtdate'));}
        if( $('#f3txtvalor').val() == "" ||  Number($('#f3txtvalor').val()) == 0 ) {
            return throwError($('#f3txtvalor'));}
        $('#formEditTrade').submit();
    });

    // Opcoes
    $('#btnopcoessubmit').click(function() {
        if($('#f2txtativo').val().length < 2) { return throwError($('#f2txtativo'));}
        if( $('#f2txtsaldo').val() == "") {
            return throwError($('#f2txtsaldo'));}
        if( $('#f2txtunitario').val() == "" ||  Number($('#f2txtunitario').val()) == 0 ) {
            return throwError($('#f2txtunitario'));}
        $('#formEditAtivo').submit();
    });

});

