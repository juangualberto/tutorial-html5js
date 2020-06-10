// Fichero index.js


/**
 * Cuando la página se ha cargado entera, comenzamos:
 *     -  Inicializamos componentes
 *     -  Configuramos opciones
 *     -  Cargamos valores por defecto
 *     -  Etc... 
 */
$(function() {

    let juego;

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

    function setDisparos() {
        $("td").each(
            function(){
                $(this).on("click",        
                function (event){
                    console.log("Has disparado en: "+event.target.getAttribute('id'));
                    juego.disparo(event.target);
                });
            });
    }

    $("#menu_partida_facil").click(function(){
        if (juego==undefined) {
            juego = new Juego("#reloj","#minas","#carita","#panel_partida_facil");
        }
        juego.setTablero("#panel_partida_facil");
        juego.partida(5,5,5);
        setDisparos();
    });

    $("#menu_partida_medio").click(function(){
        if (juego==undefined) {
            juego = new Juego("#reloj","#minas","#carita","#panel_partida_facil");
        }
        juego.setTablero("#panel_partida_medio");
        juego.partida(8,8,8);
        setDisparos();
    });

    $("#menu_partida_dificil").click(function(){
        if (juego==undefined) {
            juego = new Juego("#reloj","#minas","#carita","#panel_partida_facil");
        }
        juego.setTablero("#panel_partida_dificil");
        juego.partida(10,10,10);
        setDisparos();
    });

});
