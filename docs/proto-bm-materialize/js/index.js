
/**
 * Al evento "document ready"
 */
document.addEventListener('DOMContentLoaded', function() {

    /*
    * Inicializamos los componentes de MaaterializeCSS
    */
    M.AutoInit(); 

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

/*     document.querySelectorAll('.sidenav').forEach(element => {
        element.addEventListener('click',() => { 
            console.log(element);
            element.sidenav('close'); 
        });
    }); */
    /*
     * Arrancamos el controlador.
     */
    controller.init('panel_inicio');

});




