var refreshIntervalId;
var refreshIntervalSearchProviderId;
var globalManufName;

function getURL()         
 
            {
//             return 'http://www.be1worldservices.com/maxima/';
//             return 'http://forex.lmcomercial.com.br/appws/';
             return 'http://localhost/tradecopier/appws/';
//             return 'http://192.168.86.114/sosservicos/ws/';
         
    } 	



function loginUsr()         
            {
                $("#message-login").html("<center>Finding email information....</center>");
                var $email = document.getElementById('repEmail').value;
                var $password = document.getElementById('repPwd').value;
                
                console.log('email:'+$email);
                $.ajax({
                    type: "GET",
                    url: getURL()+"login.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"email":$email, "password":$password},
                    success: function (result, jqXHR) {
					   var userData = JSON.parse(result);
                       console.log(userData.MESSAGE+userData.ID);
                       if (userData.MESSAGE == "OK"){
            							$("#iduser").val(userData.ID);
                          console.log("loginUsr:"+userData.ID);
                          getUserProfile();
                           
                       }
                       else
                       {
                           $("#message-login").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-login").html("<center>Server busy try again later...  "+status+"</center>");
 
                    },
                });
         
    }

   function getUserProfile()         

            {
                var iduser = document.getElementById('iduser').value;
    

               $("showuserprofile").empty(); 
                console.log('getUserProfile:' + iduser);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"get-userdetail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":iduser},
                    success: function (result, jqXHR) {
         
                        var usr = JSON.parse(result);
         
                       
                            var item = "<table class='font-roboto' border='0' width='100%' style='max-height:50px;' >";
                            item = item + "<tr  style='max-height:50px;'>"; 
                            item = item + "<td style='vertical-align:center; padding-left:10px;width:25%;'>";
                            item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'></td>";
                            item = item + "<td align='left' style='padding-left:20px;width:75%;'>";
                            item = item + "<p  style='color:white;font-size:20px;padding-top:10px;'>"+usr.NAME+"</p></td></tr>";
                            
                            item = item + "</table>";
                             $("#profileUser").html(item);  
 
                            var item = "<table class='font-roboto' border='0' width='100%' style='max-height:50px;' >";
                            item = item + "<tr  style='max-height:50px;'>"; 
                            item = item + "<td style='vertical-align:center; padding-left:10px;width:25%;'>";
                            item = item + "</td ></tr>";
                             $("#profileUserEdit").html(item);  


                            var item = "<table class='font-roboto' border='0' width='100%' style='max-height:50px;' >";
                            
                            item = item + "<tr  style='max-height:250px;'>"; 
                            item = item + "<td style='vertical-align:center; padding-left:10px;width:100%;'>";
                            if (usr.TRADER == 'admin')
                               item = item + "<p  style='color:white;font-size:20px;padding-top:10px;'>Código de Referência: "+usr.USERNAME+"</p>";
                            item = item + "<p  style='color:white;font-size:20px;padding-top:10px;'>"+usr.EMAIL+"</p>";
                            if (usr.TRADER == 'admin')
                               item = item + "<p  style='color:white;font-size:20px;padding-top:10px;'>USUÁRIO TRADER</p>";
                            else
                               item = item + "<p  style='color:white;font-size:20px;padding-top:10px;'>Trader Responsável: "+usr.TRADER+"</p>";
                            item = item + "<p style='color:white;font-size:20px;padding-top:10px;'>Conta: "+usr.CONTA+" </p></td ></tr>";
                            if (usr.TRADER == 'admin')
                               item = item + "<p  style='color:white;font-size:20px;padding-top:10px;'>Martingale: "+usr.M1+"/"+usr.M2+"/"+usr.M3+"/"+usr.M4+"/"+usr.M5+"/"+usr.M6+"/"+usr.M7+"/"+usr.M8+"/"+usr.M9+"/"+usr.M10+"</p>";
                            item = item + "</table><br><br>";
                            $("#showuserprofile").html(item);


                         if (usr.TRADER == 'admin')
                         {
                        
                             listUsuariosByReferer(usr.USERNAME);
                          }
                            activate_page("#pg-profile");
 
                        
                    },
                    error: function (jqXHR, status) {
                        $("#profileUser").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 



function getUserDetails()         

            {
         
                var uid = document.getElementById('iduser').value;
                console.log(getURL());
                $.ajax({
                    type: "GET",
                    url: getURL()+"get-userdetail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":uid},
                    success: function (result, jqXHR) {
					   var userData = JSON.parse(result);
                       if (userData.MESSAGE == "OK"){
							$("#app-address").val(userData.ADDRESS);
                            $("#rootpath").val(userData.ROOTPATH);
                       }
                       else
                       {
                           $("#app-address").val('');

                       }                   
         
                        $("#message-login").html("<center>Found "+userData.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        // error message...
                        $("#app-address").val("");
 
                    },
                });
         
    }


  function listComissoes()
  {


                var iduser = document.getElementById('iduser').value;
    

               $("showuserfinanc").empty(); 
                console.log('getUserProfile:' + iduser);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"get-userdetail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":iduser},
                    success: function (result, jqXHR) {
         
                        var usr = JSON.parse(result);
         
                       
                            console.log("userimg:" + usr.USERIMG);
                            var item = "<table class='font-roboto' border='0' width='100%' style='max-height:50px;' >";
                            item = item + "<tr  style='max-height:50px;'>"; 
                            item = item + "<td style='vertical-align:center; padding-left:10px;width:25%;'>";
                            item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-size:calc(1.5vw + 1.5vh);'><img class='img-circle' width='50px' src='"+usr.USERIMG+"'></td>";
                            item = item + "<td align='left' style='padding-left:20px;width:75%;'>";
                            item = item + "<p  style='color:white;font-size:20px;padding-top:10px;'>"+usr.NAME+"</p></td ></tr>";
                            
                            item = item + "</table>";
                             $("#financUser").html(item);  
 

                             
                            var item = extratoComissoes(iduser);                            

                            $("#showuserfinanc").html(item);



                            activate_page("#pg-financeiro");    
 
                        
                    },
                    error: function (jqXHR, status) {
                        $("#financUser").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });



  }

  function mostraendereco(nome, lat,lng,distancia)
  {

       var endereco = '1201, Broadway Saugus, MA,USA';
       var meuendereco = '72, Gore Rd, Revere, MA,USA';
       $("#dadosserv").empty();
       $("#dadosserv").append(nome);
       $("#dadosserv").append("<p>"+endereco+"</p>");
       $("#dadosserv").append("<input type='hidden' id='txtOrigem' value='"+meuendereco+"'>");
       $("#dadosserv").append("<input type='hidden' id='txtDestino' value='"+endereco+"'>");
       $("#dadosserv").append("<p class='fa fa-phone '><a href='tel:+1123-456-7890'>123-456-7890</a></p>");
       $("#dadosserv").append("<p>distancia: "+distancia+" miles</p>");  
       $("#dadosserv").append("<a href='http://maps.google.com/maps?saddr="+lat+","+lng+"&daddr="+endereco+"'>Navegar ate la</a> ");  
  }


   function mostraTelaCadastro()         
{

     activate_page("#pg-signup");



}


   function onDemandSidebarFilter()         
{

        uib_sb.toggle_sidebar($(".uib_w_130"));


}




   function listEmpresas(estado)         

            {
                // clean list div...
                $("#dadosserv").empty();

                var all = $("input[id='bs-radio-group-a']:checked").val();
                var categoria = $("input[id='bs-radio-group-0']:checked").val();

                if (typeof(categoria) == "undefined")
                   var categoria = null;


                console.log ('listEmpresas: ' + all + categoria);
                var wdate = "";
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-empresas.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"categoria":categoria},
                    success: function (result, jqXHR) {
         
                        var empresas = JSON.parse(result);
                        var imagem = '';
                        $.each(empresas,function(i, empresa){
                             
                            if (categoria == "Borracharia")
                               imagem = 'http://localhost/sosservicos/images/borracharia.png';
                            
                            adicionarServicoNoMapa(imagem, empresa.ENDERECO,empresa.NOME);   

                        });
         
                        
         
                    },
                    error: function (jqXHR, status) {
                        $("#dadosserv").html("<center>Erro acesso servidor...  "+status+"</center>");
                    },
                });
         
    } 

   function listUsuariosByReferer(iduser)         

            {
                // clean list div...

               $("#showrefer").empty(); 
               qtitem = 0;
                console.log ('listUsuariosByReferer: ' + iduser);
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-usuarios-by-referer.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"iduser":iduser},
                    success: function (result, jqXHR) {
         
                        var empresas = JSON.parse(result);
                        var imagem = '';
                        $.each(empresas,function(i, empresa){

                            console.log(empresa.NOME)
                            var item = "<div class='font-roboto'  width='100%'  >";
                            
                            item = item + "<hr>";
                            item = item + "<p  style='color:white;font-size:12px;'>Nome: "+empresa.NOME+"</p>";
                            item = item + "<p  style='color:white;font-size:12px;'>Código: "+empresa.USERNAME+ "</p>";
                            item = item + "<p  style='color:white;font-size:12px;'>E-mail: "+empresa.EMAIL+"</p>";
                            item = item + "<p style='color:white;font-size:12px;'>TEL: "+empresa.TELEFONE+" </p>";
                            item = item + "<p style='color:white;font-size:12px;'>CONTA: "+empresa.CONTA+" </p>";
                            item = item + "</div>";
                            $("#showrefer").append(item); 
                            item = '';
                            qtitem++;
                        });
         
                            $("#showuserprofile").append("<p  style='color:white;font-size:20px;padding-top:10px;'>Clientes Cadastrados: "+qtitem+"</p> "); 
                            $("#showrefer").append("<br><br><br><br>"); 
                        
         
                    },
                    error: function (jqXHR, status) {
                        $("#showuserprofile").html("<center>Erro acesso servidor...  "+status+"</center>");
                    },
                });
         
    } 

   function extratoComissoes(iduser)         

            {
                // clean list div...

               $("#showtotalfinanc").empty(); 
               qtitem = 0;
               total = 0;
               totalnaopago=0;
               console.log ('extratoComissoes: ' + iduser);
               $.ajax({
                    type: "GET",
                    url: getURL()+"extrato-comissoes.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"iduser":iduser },
                    success: function (result, jqXHR) {
         
                        var empresas = JSON.parse(result);
                        var imagem = '';
                        $.each(empresas,function(i, empresa){

                            console.log(empresa.NOME)
                            var item = "<div class='font-roboto'  width='100%'  >";
                            
                            item = item + "<hr>";
                            item = item + "<p  style='color:white;font-size:12px;'>"+empresa.NOME+"</p>";
                            item = item + "<p  style='color:white;font-size:12px;'>"+empresa.DATACOMIS+"</p>";
                            item = item + "<p  style='color:white;font-size:12px;'>"+empresa.VALOR+"</p>";
                            item = item + "<p  style='color:white;font-size:12px;'>"+empresa.EMAIL+"</p>";
                            item = item + "</div>";
                            $("#showuserfinanc").append(item); 
                            item = '';
                            qtitem++;
                            total += parseFloat(empresa.VALOR);
                            if (empresa.SITUACAO == 0)
                               totalnaopago += parseFloat(empresa.VALOR);

                        });
         
                            
                            $("#showtotalfinanc").append("<p  style='color:white;font-size:20px;padding-top:15px;'>Comissões(60 dias) R$ : "+total.toFixed(2)+"</p> "); 
                            $("#showtotalfinanc").append("<p  style='color:white;font-size:20px;padding-top:15px;'>Saldo a receber R$ : "+totalnaopago.toFixed(2)+"</p> "); 
                            $("#showtotalfinanc").append("<p  style='color:white;font-size:20px;padding-top:15px;'> ");
                            $("#showtotalfinanc").append('<a href="#"  onclick="solicitarPagamento();" style="font-size: 20px;min-width:20%;align:right;padding-left:20px;">');
                            $("#showtotalfinanc").append('<i class="fa fa-money custom-icon "></i>&nbsp;&nbsp;Solicitar Pagamento</a>');       

         
                    },
                    error: function (jqXHR, status) {
                        $("#showuserfinanc").html("<center>Erro acesso servidor...  "+status+"</center>");
                    },
                });
         
    } 





function aplicarFiltro(qtimagens)         
{    
                 var idusuario = document.getElementById('iduser').value;
                 var idorc = document.getElementById('idorc').value;

                var selecao = $("input[id='bs-radio-group-0']:checked").val();

                proximasimagens(1,selecao);
                uib_sb.toggle_sidebar($(".uib_w_162"));
}






	function addUserSignup()         

            {
				
          var fname = document.getElementById('setup-fname').value;
          var username = document.getElementById('setup-codigo').value;
					var email = document.getElementById('setup-email').value;
          var conta = document.getElementById('setup-conta').value;
          var trader = document.getElementById('setup-trader').value;
					var pwd = document.getElementById('setup-pwd1').value;
          var pwd2 = document.getElementById('setup-pwd2').value;
          var tipo = 'USER';
          var categoria = 'USER';
          if (fname == ''  || username == ''  || email == '' || pwd == '' || conta == '' || trader == '' )
          {
               $("#message-signup1").html('<center><b><font color="red">Todos os campos devem ser informados</font> </center><br>');
               return true ;

          }

          $("#repEmail").val(email);
          $("#repPwd").val(pwd);
 
					var error = true;
					console.log('addUser');
                $.ajax({
                    type: "GET",
                    url: getURL()+"add-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"name": fname,"username": username,"conta": conta, "pwd":pwd, "trader":trader, "email":email},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#iduser").val(userData.UID);
            						   $("#message-signup1").html('<center><b>Cadastro efetuado com sucesso </center>');
                           $("#message-signup1").append('<a href="#" onclick="mostrartelainicial();"><b>VOLTAR</b></a>');
                           $("#iduser").val(userData.UID);
	  					             error = false;

                       }
                       else
                       {
                           $("#message-signup1").html('<center><b>Ocorreu um erro : '+userData.MESSAGE+'</center>');
                           error = true;
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-signup1").html("<center>Server busy try again later... "+status+"</center>");
                        error = true;
					
					},
                });
				
				return error;
         
    } 	
function mostrartelainicial()
{

        activate_page("#mainpage");

}

function profileShowPage()
{

          var iduser = document.getElementById('iduser').value;
          console.log('profileshowpage-iduser:'+iduser);
          if (iduser == '' || iduser == null)
             activate_page("#pg-login2");
          else 
             getUserProfile();


}





  function updateUser()         

            {
				
					var uid = document.getElementById('iduser').value;
					var nome = document.getElementById('unome').value;
					var conta = document.getElementById('uconta').value;
					var email = document.getElementById('uemail').value;
					var m1 = document.getElementById('um1').value;
          var m2 = document.getElementById('um2').value;
          var m3 = document.getElementById('um3').value;
          var m4 = document.getElementById('um4').value;
          var m5 = document.getElementById('um5').value;
          var m6 = document.getElementById('um6').value;
          var m7 = document.getElementById('um7').value;
          var m8 = document.getElementById('um8').value;
          var m9 = document.getElementById('um9').value;
          var m10 = document.getElementById('um10').value;
          if (m1 == '') m1 =0;
          if (m2 == '') m2 =0;
          if (m3 == '') m3 =0;
          if (m4 == '') m4 =0;
          if (m5 == '') m5 =0;
          if (m6 == '') m6 =0;
          if (m7 == '') m7 =0;
          if (m8 == '') m8 =0;
          if (m9 == '') m9 =0;
          if (m10 == '') m1 =0;
          if (conta == '' || conta == null)
          {
              $("#messageprofileedit").html('<center><b>CIDADE Invalido </center>');
              return;      
          }
          if (nome == '' || nome == null)
          {
              $("#messageprofileedit").html('<center><b>NOME Invalido </center>');
              return;      
          }
          if (email == '' || email == null)
          {
              $("#messageprofileedit").html('<center><b>EMAIL Invalido </center>');
              return;      
          }


					console.log('updateUser:'+uid+nome+conta+email+m1+m2+m3+m4+m5+m6+m7+m8+m9+m10);
           $("#messageprofileedit").empty();
                $.ajax({
                    type: "GET",
                    url: getURL()+"update-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					          data: {"uid": uid, "nome":nome, "conta":conta , "email":email, "m1":m1, "m2":m2, "m3":m3, "m4":m4, "m5":m5, "m6":m6, "m7":m7, "m8":m8, "m9":m9, "m10":m10},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                        console.log(userData);
                       if (userData.MESSAGE == "OK"){
 						               $("#messageprofileedit").html('<center><b>Atualização efetuada com sucesso</center>');
                       }
                       else
                       {
                           $("#messageprofileedit").html('<center><b>Ocorreu um erro </center>');
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#messageprofileedit").html("<center>Server busy try again later... "+status+"</center>");
					
					},
                });
				
         
    }	


  function updateUserLoja()         

            {
        
          var uid = document.getElementById('iduser').value;
          var nome = document.getElementById('unome').value;
          var endereco = document.getElementById('uendereco').value;
          var telefone = document.getElementById('utelefone').value;
          var email = document.getElementById('uemail').value;
          var cidade = document.getElementById('ucidade').value;
          console.log('addUser:'+uid);
           $("#messageprofileedit").empty();
                $.ajax({
                    type: "GET",
                    url: getURL()+"update-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid": uid, "nome":nome, "endereco":endereco , "telefone":telefone, "email":email, "cidade":cidade},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#messageprofileedit").html('<center><b>Atualização efetuada com sucesso</center>');
                       }
                       else
                       {
                           $("#messageprofileedit").html('<center><b>Ocorreu um erro </center>');
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#messageprofileedit").html("<center>Server busy try again later... "+status+"</center>");
          
          },
                });
        
         
    } 



  function updateUserPicture(name)         

            {
                    $("#msgprofile").empty();
                    var uid = document.getElementById('iduser').value;
                    console.log('updateUserPicture');
                $.ajax({
                    type: "GET",
                    url: getURL()+"update-user-picture.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid": uid, "name":name},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#msgprofile").html('<center><b>'+userData.MESSAGE+'</center>');
                       }
                       else
                       {
                           $("#msgprofile").html('<center><b>'+userData.MESSAGE+'</center>');
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgprofile").html("<center>Server busy try again later... "+status+"</center>");
                    
                    },
                });
                
         
    }   


  function updateUsuarioPicture(iduser,name)         

            {
                    $("#msgprofile").empty();
                    var uid = document.getElementById('iduser').value;
                    console.log('updateUsuarioPicture'+uid+name);
                $.ajax({
                    type: "GET",
                    url: getURL()+"update-user-picture.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid": iduser, "name":name},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#msgprofile").html('<center><b>'+userData.MESSAGE+'</center>');
                       }
                       else
                       {
                           $("#msgprofile").html('<center><b>'+userData.MESSAGE+'</center>');
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgprofile").html("<center>Server busy try again later... "+status+"</center>");
                    
                    },
                });
                
         
    }   

	
  function sendText(uid)         

            {
				
					console.log('sendText');
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-text.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"uid": uid},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       $("#message-signup-3").html('<center><b>'+userData.MESSAGE+'</center>');
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-signup-3").html("<center>Server busy try again later... "+status+"</center>");
					
					},
                });
				
         
    }	


	
function editProfile()         
            {
        console.log('editProfile');        
        getProfile();        
            }	
	
function getProfile()         
            {
                var $uid = document.getElementById('iduser').value;
                $.ajax({
                    type: "GET",
                    url: getURL()+"get-userdetail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":$uid},
                    success: function (result, jqXHR) {
                       console.log(result);
						           var userData = JSON.parse(result);
                      
                       
                       if (userData.MESSAGE == "OK"){

                            var item = "<table class='font-roboto font-white-1 bg-pg-ondemand' align='center' width='100%' height='50px' style='background-size: cover ;background-size: 100% auto;' >";
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='nome'>Nome:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='unome' value='"+userData.NAME+"'</>";
                                item = item + "</td></tr>";
          
            
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='email'>E-mail:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='uemail' value='"+userData.EMAIL+"'</>";
                                item = item + "</td></tr>";

                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='Conta'>Conta:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='uconta' value='"+userData.CONTA+"'</>";
                                item = item + "</td></tr>";
                              if (userData.TRADER == 'admin')
                              {  
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='m1'>Martingale 1:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='um1' value='"+userData.M1+"'</>";
                                item = item + "</td></tr>";
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='m2'>Martingale 2:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='um2' value='"+userData.M2+"'</>";
                                item = item + "</td></tr>";
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='m3'>Martingale 3:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='um3' value='"+userData.M3+"'</>";
                                item = item + "</td></tr>";
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='m4'>Martingale 4:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='um4' value='"+userData.M4+"'</>";
                                item = item + "</td></tr>";
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='m5'>Martingale 5:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='um5' value='"+userData.M5+"'</>";
                                item = item + "</td></tr>";
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='m6'>Martingale 6:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='um6' value='"+userData.M6+"'</>";
                                item = item + "</td></tr>";
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='m7'>Martingale 7:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='um7' value='"+userData.M7+"'</>";
                                item = item + "</td></tr>";
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='m8'>Martingale 8:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='um8' value='"+userData.M8+"'</>";
                                item = item + "</td></tr>";
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='m9'>Martingale 9:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='um9' value='"+userData.M9+"'</>";
                                item = item + "</td></tr>";
                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<label for='m10'>Martingale 10:&nbsp</></td>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'>";
                                item = item + "<input type='text' class='wide-control text-line-input font-login-color' id='um10' value='"+userData.M10+"'</>";
                                item = item + "</td></tr>";
                             }


                                item = item + "<tr style= 'background: rgba(12,12,12,0.36);height:20px;'>";
                                item = item + "<td style='align:left;valign:bottom;padding-left:0px;padding-bottom:0px;padding-top:10px;'v colspan='2'>";
                                item = item + "<center><button onclick='updateUser()' class='btn widget uib_w_113 font-white font-oswald-14 signin-button font-login-color font-roboto btn-default bt-login-red'>";
                                item = item + "Salvar</button></center>";
                                item = item + "</td></tr>";

                                item = item + "</table>";
                               $("#showProfileEditForm").html(item);
                                activate_page("#pg-profile-edit");

                       }
                       else
                       {
                           $("#message-profile").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
//                        $("#message-login").html("<center>Foram encontrado "+drivers.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-login").html("<center>Server busy try again later...  "+status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                    },
                });
         
    }

function enviarMensagem()
{
            activate_page("#email-contact");
}

function telaInicial()
{
            activate_page("#mainpage");

}	


	
function sendEmail()         
            

            {
                $("#messageReturnEmail").html("<center></center>");
                $("#message-signup").html("<center></center>");
                var uid = document.getElementById('iduser').value; 
                var subject = document.getElementById('emailSubject').value; 
                var message = document.getElementById('emailText').value; 
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-emailcontact.php",
                    timeout: 8000,
          					data: {"uid": uid,"subject": subject,"message": message},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
                        var retemail = JSON.parse(result);
                        $("#messageReturnEmail").html("<center>Mensagem Enviada.</center>");
                        $("#message-signup").html("<center>Message Sent.</center>");

						//activate_page("#pg-services");
         
                    },
                    error: function (jqXHR, status) {
                        $("#messageReturnEmail").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 

function sendEmailSignup()         
            

            {
                $("#message-signup").html("<center></center>");
                var email = document.getElementById('setup-email').value; 
                var nome = document.getElementById('setup-fname').value; 
                var endereco = document.getElementById('setup-address').value; 
                var message = "Bem vindo ao Orcamento Facil!!!"; 
                console.log('message:'+message+'nome:'+nome);
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-emailsignup.php",
                    timeout: 8000,
                    data: {"email": email,"nome": nome, "endereco": endereco,"message": message},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
                        console.log('RESULT EMAIL:'+result);
                        var retemail = JSON.parse(result);
                        console.log('RESULT EMAIL:'+result);
                        $("#message-signup").html("<center>Message Sent.</center>");

                        //activate_page("#pg-services");
         
                    },
                    error: function (jqXHR, status) {
                        $("#messageReturnEmail").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 




  function calcRoute(olat,olng,dlat,dlng) {
    var start = new google.maps.LatLng(olat, olng);
    var end = new google.maps.LatLng(dlat, dlng);
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();    
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });
  }

