// Fichero index.js


/**
 * Cuando la página se ha cargado entera, comenzamos:
 *     -  Inicializamos componentes
 *     -  Configuramos opciones
 *     -  Cargamos valores por defecto
 *     -  Etc... 
 */
$(function() {

    let juego = new Juego("#reloj","#minas","#carita", "#panel_puntuaciones");

    /**
     * Código para hacer que se cierre sólo el menú al pulsar sobre él
     */
    $('.navbar-nav li a').on('click', function(){
        if(!$( this ).hasClass('dropdown-toggle')){
            $('.navbar-collapse').collapse('hide');
        }
    });


    /**
     * Iniciamos el controlador que gestiona los eventos de 
     * los menús y activa/desactiva las vistas
     */
    $.controller.init("#panel_inicio");


    $.singleDoubleClick = function(singleClk, doubleClk) {
        return (function() {
          var alreadyclicked = false;
          var alreadyclickedTimeout;
    
          return function(e) {
            if (alreadyclicked) {
              // double
              alreadyclicked = false;
              alreadyclickedTimeout && clearTimeout(alreadyclickedTimeout);
              doubleClk && doubleClk(e);
            } else {
              // single
              alreadyclicked = true;
              alreadyclickedTimeout = setTimeout(function() {
                alreadyclicked = false;
                singleClk && singleClk(e);
              }, 300);
            }
          };
        })();
      };

    function setDisparos() {
      $('td').bind('click', $.singleDoubleClick(function(e){
        //single click.
        juego.disparo(e.target);
      }, function(e){
        //double click.
        juego.cambiaBandera(e.target);
      }));
    }

    $("#menu_partida_facil").click(function(){     
        juego.setTablero("#panel_partida_facil");
        juego.partida(5,5,1);
        setDisparos();
    });

    $("#menu_partida_medio").click(function(){
        juego.setTablero("#panel_partida_medio");
        juego.partida(8,8,8);
        setDisparos();
    });

    $("#menu_partida_dificil").click(function(){
        juego.setTablero("#panel_partida_dificil");
        juego.partida(10,10,10);
        setDisparos();
    });

    $("#carita").dblclick(function(){
        juego.partida();
        setDisparos();
    });

    $("#salvarPuntos").click(function(){
      console.log("Guardar puntos");
      juego.guardarPuntos();
      $.controller.activate("#panel_puntuaciones");
    });

});
