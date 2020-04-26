/**
 * inicializamos el objeto
 */
controller = {};
controller.active_panel = '';

/**
 * Esta función gestiona qué panel está activo en cada momento (sólo puede
 * haber uno)
 * @param {type} panel_name el nombre del panel a activar
 */
controller.activate = (panel_name) => {
    console.log("old_panel::"+controller.active_panel+" new_panel::"+panel_name);
    document.getElementById(controller.active_panel).style.display = 'none';
    document.getElementById(panel_name).style.display = 'block';
    controller.active_panel = panel_name;
};

/**
 * Función para crear todos los "onClick" de los menús y
 * asociarlos con cada panel correspondiente.
 */
controller.active_panel = "";

controller.init = function (panel_inicial) {
    // guardamos el estado
    controller.active_panel = panel_inicial;
    // añadimos eventos pulsar menú -> activar panel
    document.querySelectorAll('[id^="menu_"]').forEach(
        menu => {
            let menu_id = menu.getAttribute("id");
            let panel_id = menu_id.replace('menu_', 'panel_');
            menu.addEventListener('click', function(e) {
                controller.activate(panel_id);
            },false);
        }
    );
    // ocultamos todos los paneles
    document.querySelectorAll('.panel').forEach(
        panel => { panel.style.display='none'; }
    );
    // mostramos sólo el activo
    document.getElementById(panel_inicial).style.display = 'block';

};
