/**
 * Biblioteca "casera" para hacer el "binding" del
 * os menús con las diferentes vistas de la APP.
 * Para usarla, basta con poner el mismo id a la entrada 
 * del menú que a su vista asociada, pero cambiando el prefijo, 
 * el el menú debe ser menu_AAA y en la vista panel_AAA.
 */
$.controller = {};

/**
 * Esta función gestiona qué panel está activo en cada momento (sólo puede
 * haber uno)
 * @param {type} panel_name el nombre del panel a activar
 */
$.controller.activate = function (panel_name) {
    console.log("cambio old::"+$.controller.active_panel+" new::"+panel_name);
    $($.controller.active_panel).hide();
    $(panel_name).show();
    $.controller.active_panel = panel_name;
};

/**
 * Función para crear todos los "onClick" de los menús y
 * asociarlos con cada panel correspondiente.
 */
$.controller.active_panel = "";

$.controller.init = function (panel_inicial) {
    $('[id^="menu_"]').each(function () {
        var $this = $(this);
        var menu_id = $this.attr('id');
        var panel_id = menu_id.replace('menu_', 'panel_');

        $("#" + menu_id).click(function () {
            $.controller.activate("#" + panel_id);
        });
        // console.log("id_menu::" + menu_id + "  id_panel" + panel_id);
    });
    $(".panel").hide();
    $.controller.active_panel = panel_inicial;
    $.controller.activate(panel_inicial);
};
