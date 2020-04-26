$('.navbar-nav li a').on('click', function(){
    if(!$( this ).hasClass('dropdown-toggle')){
        $('.navbar-collapse').collapse('hide');
    }
});



/**
 * Iniciamos el controlador que gestiona los eventos de 
 * los menús y activa/desactiva las vistas
 */
$.controller.init("panel_inicio");

