app.initialize();


var db = window.openDatabase("Database", "1.0", "Agenda", 2000);
db.transaction(createDB, errorDB, successDB);
document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
	db.transaction(createDB, errorDB, successDB);
}


// Trata erro de criação do Banco de Dados
function errorDB(err) {
	alert("Erro: " + err);
}


// Executa se criou o Banco de Dados com sucesso
function successDB() { }


//Cria a tabela se a mesma não existir    
function createDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS loja (id INTEGER PRIMARY KEY, nome VARCHAR(50), quant NUM(15), preco NUM(10) )');
}


// Prepara para incluir registro na tabela Agenda
function loja_insert() {
	db.transaction(agenda_insert_db, errorDB, successDB);
}


// Inclui registro na tabela Agenda
function loja_insert_db(tx) {
	var nome = $("#loja_nome").val();
	var quant = $("#loja_quant").val();
	var preco = $("#loja_preco").val();
	tx.executeSql('INSERT INTO loja (nome, quant, preco) VALUES ("' + nome + '", "' + quant + '","' + preco + '")');
	loja_view();
}



//Prepara para deletar registro da tabela agenda
function loja_delete(agenda_id){
	$("#loja_id_delete").val(loja_id);
	db.transaction(loja_delete_db,errorDB,successDB);
}
//Deleta registro da tabela Agenda e chama a funcao agenda_view()
function loja_delete_db(tx){
	var loja_id_delete = $("#loja_id_delete").val();
	tx.executeSql("DELETE FROM loja WHERE id = "+loja_id_delete);
	loja_view();
}
function loja_view(){
	db.transaction(loja_view_db,errorDB,successDB);
}
function loja_view_db(tx){
	tx.executeSql('SELECT * FROM loja',[],loja_view_data,errorDB);
}
function loja_view_data(tx,results){
$("#loja_listagem").empty();
var len = results.rows.length;

for(var i = 0; i <len;i++){
	$("#loja_listagem").append("<tr class='loja_item_lista'>"+
		"<td><h3>" + results.rows.item(i).nome + "</h2></td>"+
		"<td><h3>" + results.rows.item(i).tel + "</h3></td"+
		"<br><td><input type='button' class='btn btn-lg btn-danger' value='X' onclick='loja_delete(" + results.rows.item(i).id +")'>"
	+"---<input type='button' class='btn btn-lg btn-warning' value='E' onclick='loja_update_abrir_tela(" + results.rows.item(i).id +")'></td" + "</tr>");
	}
}
function loja_update_abrir_tela(loja_id){
$("#tela_padrao").hide();//enconde tela inicial
$("#tela_edicao").show();//mostra tela de edição

var loja_nome_update = $("#loja_item_"+loja_id+" .loja_info h3").html();
var loja_telefone_update = $("#loja_item_"+loja_id + ".loja_info h5").html();

$("#loja_id_update").val(loja_id);
$("#loja_nome_update").val(loja_nome_update);
$("#loja_telefone_update").val(loja_telefone_update);
}
function loja_update_fechar_tela(){
	$("#tela_edicao").hide();//esconde tela de edicao
	$("#tela_padrao").show();//mostra tela inicial
	}
	function loja_update(){
		db.transaction(loja_update_db,errorDB,successDB);
	}
	function agenda_update_db(tx){

		var loja_id_novo = $("#loja_id_update").val();
		var loja_nome_novo= $("#loja_nome_update").val();
		var loja_telefone_novo=$("#loja_telefone_update").val();

			tx.executeSql('UPDATE Agenda SET  nome ="' + loja_nome_novo + '", quant="' + loja_telefone_novo+ '", preco="'+loja_preco_novo+'", WHERE id="'+agenda_id_novo +'" ');
			loja_update_fechar_tela();
			loja_view();
	}
function incluirItens(){
 
    var nome = form1.nome.value;
    var quant = form1.quant.value;
    var preco = form1.preco.value;


        if(nome.length > 8){
        alert('Nome no maximo 30 caracteres');
            form1.nome.focus();
        return false;
        }
        
        //senha validando
        if(nome == ""){
        alert('Preencha o campo nome');
            form1.nome.focus();
        return false;
        }

        if(quant == ""){
        alert('Preencha o campo quantidade');
            form1.quant.focus();
        return false;
        }

         if(preco == ""){
        alert('Preencha o campo preço');
            form1.preco.focus();
        return false;
        }
   
    
    }
    


