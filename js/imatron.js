var texto_dictado="";
var comando="";
$( document ).ready(function()
{
    document.onreadystatechange = () =>{
    if (document.readyState === 'complete')
    {


      function hablar(mensaje="")
      {
        //comando="";
        var speechSynthesisUtterance = new SpeechSynthesisUtterance(mensaje);
        //console.log('array'+speechSynthesisUtterance.getVoices());
        speechSynthesisUtterance.lang = 'es-MX';//Definir el Idioma
        speechSynthesisUtterance.pitch = 0;//Definir el Tono de la Voz 0 a 2
        speechSynthesisUtterance.rate = 1;//Definir la Velocidad del Parlante 0.1 a 10
        window.speechSynthesis.speak(speechSynthesisUtterance);
      }


      //funcion de habla
      function Speech()
      {
        if ('webkitSpeechRecognition' in window)
        {
          // creating voice capture object
          var recognition;
          recognition = new webkitSpeechRecognition();
          recognition.continuous = false; // stop automatically
          recognition.interimResults = true;
          recognition.pitch = 2;//Definir el Tono de la Voz 0 a 2
          recognition.lang = "es-Mx";//definir el lenguaje
          //inicializar el metodo de reconocimiento de voz
          //startCapture = function() {
            recognition.start();
          //}

          //almacenar el texto dictado
          recognition.onresult = function(event){
            //console.log(event);
            texto_dictado=event.results[0][0].transcript || "";//reconociendo el texto y alamcenarlo en la variable texto
          }

          //finalizacion y analisis de Datos
          recognition.onend = function()
          {
            console.log('termine de hablar '+texto_dictado);
            if(texto_dictado!="undefined"){
                comandos(texto_dictado);
            }
            texto_dictado="";
            recognition.start();
          }

          //pausar el metodo de reconocimiento de voz
          //stopCapture = function() {   //recognition.stop();   //}

          //capturar errores
          recognition.onerror = function(event) {
            //console.log('Error: '+event.error);
            console.log('Necesitas Algo,Te puedo Ayudar?');
          }

          console.log("webkitSpeechRecognition esta habilitado.");
        } else {
          console.log("webkitSpeechRecognition no esta listo.");
        }
      }

      Speech();

      //Comandos
      function comandos(comando){
        comando=comando.toLowerCase();//convertir a minusculas
        tam_cadena=comando.length;
        console.log(comando);
        if(tam_cadena>0)
        {
            //Hola
            if(comando.indexOf("hola")!=-1){
                console.log('comando aceptado');
                hablar("Hola Soy Gamia Q1 , Sere tu asistente, puedes consultarme lo que necesites.");
            }
            else if(comando.indexOf("abrir guía")!=-1 || comando.indexOf("abre la guía")!=-1){
              hablar("Redireccionando a la Guia Interactiva de Hoteles.");
              window.open('http://guiainteractivadehoteles.com/', '_blank');
            }
            else if(comando.indexOf("abre imacop")!=-1 || comando.indexOf("abre página de imacop")!=-1){
              hablar("Redireccionando a la Pagina de Imacop.");
              window.open('http://imacoptour.com/', '_blank');
            }
            else if(comando.indexOf("abre globalizador")!=-1 || comando.indexOf("abrir globalizador")!=-1){
              hablar("Redireccionando a Globalizador Imacop.");
              window.open('https://agencias.imacoponline.com/', '_blank');
            }
            else if(comando.indexOf("abre tarifas especiales")!=-1 || comando.indexOf("abrir tarifas especiales")!=-1){
              hablar("Redireccionando a Tarifas Especiales.");
              window.open('https://imacoponline.com/ESPECIALES/', '_blank');
            }
            else if(comando.indexOf("buscar")!=-1 || comando.indexOf("busca")!=-1)
            {
              hablar(comando+",Listo!");
              window.open('https://www.google.com/search?q='+comando+'', '_blank');
            }

        }

      }


    }//DOM LISTO
  }
});//CARGA DE DOCUMENTO
