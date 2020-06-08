<div style="display:none"> 
\pagebreak 
</div>

# Semana 6: JavaScript - El árbol DOM

El Modelo de Objetos del Documento (del inglés Document Object Model) es una interfaz de programación de aplicaciones (lo que los programadores llamamos una API) para documentos [bien formados](https://en.wikipedia.org/wiki/Well-formed_document) y válidos [válidos](https://www.w3schools.com/xml/xml_validator.asp) . Define la estructura lógica de los documentos y el modo en que se accede y manipula.

Una página Web es un documento que internamente un ordenador *lo ve* como si fuese un árbol. Sea el siguiente código fuente (puedes acceder al [original en esta Web](https://vinaytech.wordpress.com/2008/11/24/ajax-and-dom/)):

```html

<html>
    <head>
        <title>Trickier nesting, still</title>
    </head>
<body>
    <div id=”main-body”>
        <div id=”contents”>
            <table>
                <tr>
                    <th>
                        Steps
                    </th>
                    <th>
                        Process
                    </th>
                </tr>
                <tr>
                    <td>
                        1
                    </td>
                    <td>
                        Figure out the 
                        <em>root element</em>.
                    </td>
                </tr>
                <tr>
                    <td>
                        2
                    </td>
                    <td>
                        Deal with the 
                        <span id=”code”>head</span>
                        first,
                        as it’s usually easy.
                    </td>
                </tr>
                <tr>
                    <td>
                        3
                    </td>
                    <td>
                        Work through the 
                        <span id=”code”>body</span>.
                        Just <em>take your time</em>.
                    </td>
                </tr>
            </table>
        </div>
        <div id=”closing”>
        This link is <em>not</em> active, 
        but if it were, the answers to this 
        <a href=”answers.html”>
        <img src=”exercise.gif” /></a>
        would be there. But 
        <em>do the exercise anyway!</em>
        </div>
    </div>
</body>
</html>

```

La representación **gráfica** que podemos hacer del mismo sería algo parecido a esto:

![El árbol DOM](./docs/tree.png)

Es decir, tiene lo que en probramación se llama *estructura de árbol*.

JavaScript nos proporciona herramientas para preguntar a cada nodo por sus hijos, sus padres, sus hermanos, el tipo de elemento, el contenido del mismo... A eso lo llamamos la API DOM.

## jQuery

Para manipular el árbol DOM, aunque ya hay otras tecnologías más modernas, existe una biblioteca multiplataforma de JavaScript que permite hacerlo de una manera más sencilla.

Recuerda lo que vimos las semanas pasadas: tenemos una serie de "cajas" que llamábamos paneles, a los que ponemos un nombre gracias al atributo **id** que se puede poner a cualquier elemento HTML (no puede haber jamás dos elementos con el mismo *id*, es como el DNI de las etiquetas HTML) y le asignábamos una clase gracias al atributo **class** (esto nos ayudaba con los CSS u hojas de estilo). Veamos cómo funciona *jQuery* con unos ejemplos sobre manipulación de esta pieza de HTML:

```html
<div class="container">
    <div id="panel_inicio" class="panel">
        <p>Inicio</p>
    </div>
    <div id="panel_partida_facil" class="panel">
        <p>Partida Fácil</p>
    </div>
    <div id="panel_partida_medio" class="panel">
        <p>Partida Medio</p>
    </div>
    <div id="panel_partida_dificil" class="panel">
        <p>Partida Dificil</p>
    </div>
    <div id="panel_ayuda" class="panel">
        <p>Ayuda</p>
    </div>
    <div id="panel_licencia" class="panel">
        <p>Licencia</p>
    </div>
    <div id="panel_puntuaciones" class="panel">
        <p>Puntuaciones</p>
    </div>
</div>
```

Quiero seleccionar la caja con **id** "panel_inicio", pues en jQuery sería (fíjate como ponemos el *id* entre comillas y le ponemos delante el carácter almohadilla):

```javascript
let caja_inicio = $("#panel_inicio");
```

Quiero seleccionar todos los \<div> de la página Web:

```javascript
let todos_los_div  = $("div");
```

Quiero seleccionar todos los \<div> que sean de clase "panel":

```javascript
let divs_paneles = $("div.panel");
```

Quiero seleccionar cualquier elemento que sea de clase "panel":

```javascript
let paneles = $(".panel");
```

Quiero seleccionar todos los elementos con **id** que comienza por la palabra "**panel_**":

```javascript
let elementos = $('[id^="panel_"]');
```

Quiero ocultar todos los "paneles" (nuestros *div* con clase "panel"):

```javascript
$("div.panel").hide();
```

Quiero mostrar sólo el "panel de inicio":

```javascript
$("div.panel").hide();
$("#panel_inicio").show();
```

Quiero generar una tabla de 5x5 para la partida fácil y colgarla dentro del panel "partida_fácil":

```javascript
    // almacenamos temporalmente en la variable "panel"
    // la caja o panel de partida fácil:
    let panel = $("#panel_partida_facil");
    // vaciamos el contenido del panel
    panel.empty();
    let mi_tabla = $("<table/>");
    // vamos a generar una tabla de 5 por 5
    for (let i=0; i<5; i++){
        // cada iteración de la i, se añade una fila (append)
        let fila = $("<tr></tr>");
        for (let j=0; j<5; j++){
            // cada iteración de la j, se añade una celda (append)
            let celda = $("<td id=\"celda_"+i+"_"+j+"\">"+"</td>");
            celda.addClass("vacio");
            fila.append(celda);
        }
        mi_tabla.append(fila);
    }
    // se añade la tabla al panel partida fácil (con append)
    panel.append(mi_tabla);
```

## Fichero juego.js

Esta semana creamos el fichero **juego.js** en el directorio **js**:

```javascript
// var $ = require('jQuery'); con ECMA7

/**
 * Esta clase gestiona la partida de Buscaminas
 */
class Juego {
    
    /**
     * Constructor, crea el objeto encargado del gestionar el juego y las partidas
     * 
     * @param {string} id_tiempo El identificador de la caja que va a contener 
     * el tiempo en segundos de la partida 
     * @param {string} id_minas El identificador donde está la caja que 
     * contiene el número de minas
     * @param {string} id_carita El identificador donde está el *smiley* que
     * va cambiando conforme evoluciona la partida
     * @param {string} id_tablero El identificador de la caja que va a contener la tabla
     * de las minas donde hacer clic
     */
    constructor(id_tiempo="#tiempo", id_minas="#minas", 
            id_carita="#carita", id_tablero="#tablero"){
        this.caja_tiempo=$(id_tiempo);
        this.caja_minas=$(id_minas);
        this.caja_carita=$(id_carita);
        this.caja_tablero=$(id_tablero);
        this.marcadores = new Marcadores();
        this.timer=null;
    }

    pintaTablero(){
        this.caja_tablero.empty();
        let mi_tabla = $("<table/>");

        // vamos a generar una tabla de n_filas por n_columnas
        for (var i=0; i<this.matriz.getFilas(); i++){
            // cada iteración de la i, se añade una fila
            let fila = $("<tr></tr>");
            for (var j=0; j<this.matriz.getColumnas(); j++){
                // cada iteración de la j, se añade una celda
                let celda = $("<td id=\"celda_"+i+"_"+j+"\">"+"</td>");
                celda.addClass("vacio");
                // celda.attr("onclick","alert(\'disparo en: "+i+","+j+"\')");
                fila.append(celda);
            }
            mi_tabla.append(fila);
        }
        this.caja_tablero.append(mi_tabla);

    }

    partida(filas=10, columnas=10, minas=20){
        this.caja_carita.removeAttr('class');
        this.caja_carita.addClass('caraBanderita');
        this.matriz = new Matriz(filas, columnas);
        this.matriz.ponMinas(minas);
        this.minas = minas;
        this.filas = filas;
        this.columnas = columnas;
        this.aciertos = filas*columnas-minas;
        this.matriz.ponContadores();

        this.caja_minas.html(minas);
        this.caja_tiempo.html(0);

        this.pintaTablero();
        // this.resuelve();

        clearInterval(this.timer);
        this.timer = setInterval(function(data){
            data.html( +(data.html())+ 1);
        }, 1000, this.caja_tiempo);
        
        this.matriz.imprimeMatriz();
    }

    resuelve(perder){
        if (this.matriz!=undefined) {
            for (let i=0; i<this.matriz.getFilas();i++) {
                for (let j=0; j<this.matriz.getColumnas();j++){
                    if (this.matriz.get(i,j)==-1) {
                        let td = $("#celda_"+i+"_"+j);
                        td.removeAttr("class");
                        if (perder) td.addClass("bombaAnulada");
                        else td.addClass("bomba");
                    } else {
                        this.cambiaClase(i,j);
                    }
                }
            }
        }
    }

    destapa(fila,columna){
        if (fila>=0 && fila<this.filas && columna>=0 && columna<this.columnas) {
            console.log("destapando "+fila+","+columna);
            // this.cambiaClase(fila,columna);
            this.destapa(fila-1,columna-1);
            this.destapa(fila+1,columna+1);
        }
    }

    resuelveCelda(i,j){
        let td = $("#celda_"+i+"_"+j);
        if (this.aciertos>0){
            this.aciertos--;
            this.cambiaClase(i,j);
        } 
        // hemos ganado!!
        if (this.aciertos==0) {
                this.resuelve(false);
                clearInterval(this.timer);
                this.caja_carita.removeAttr('class');
                this.caja_carita.addClass('caraGanar');
                // alert("Has ganado!!!");
                let filas =  this.filas;
                let columnas = this.columnas;
                let tiempo = (+this.caja_tiempo.html());
                let puntos = Math.floor( (this.minas*this.minas)/(filas*columnas*tiempo)*100000);
                $('#puntosJugador').html(puntos);
                $('#tiempoJugador').html(tiempo);
                $("#modalPuntuacion").modal();
        } 
    }


    guardarPuntos(){
        let filas =  this.filas;
        let columnas = this.columnas;
        let tiempo = (+this.caja_tiempo.html());
        let puntos = Math.floor( (this.minas*this.minas)/(filas*columnas*tiempo)*100000);
        this.marcadores.addMarcador($('#nombreJugador').val(), 
            puntos, tiempo, filas, 
            columnas, this.minas);
        $('#puntosJugador').html(puntos);
        $('#tiempoJugador').html(tiempo);
        return (this.marcadores.getTabla());
    }


    cambiaClase(i,j){
        if (this.matriz.get(i,j)==0) {
            console.log("destapando "+i+","+j);
            // this.destapa(i,j);
        }
        let td = $("#celda_"+i+"_"+j);
        switch(this.matriz.get(i,j)){
            case -1:
                this.caja_carita.removeAttr('class');
                this.caja_carita.addClass('caraPerder');
                td.removeAttr("class");
                td.addClass("bombaExplotada");
                this.aciertos=-1;
                clearInterval(this.timer);
                // alert("Has perdido!!!");
                this.matriz.set(i,j,-11);
                this.resuelve(true);
                break;
            case 1:
                td.removeAttr("class");
                td.addClass("oneCell");
                this.matriz.set(i,j,11);
                break;
            case 2:
                td.removeAttr("class");
                td.addClass("twoCell");
                this.matriz.set(i,j,12);
                break;
            case 3:
                td.removeAttr("class");
                td.addClass("threeCell");
                this.matriz.set(i,j,13);
                break;
            case 4:
                td.removeAttr("class");
                td.addClass("fourCell");
                this.matriz.set(i,j,14);
                break;
            case 5:
                td.removeAttr("class");
                td.addClass("fiveCell");
                this.matriz.set(i,j,15);
                break;
            case 6:
                td.removeAttr("class");
                td.addClass("sixCell");
                this.matriz.set(i,j,16);
                break;
            case 7:
                td.removeAttr("class");
                td.addClass("sevenCell");
                this.matriz.set(i,j,17);
                break;
            case 8:
                td.removeAttr("class");
                td.addClass("eigthCell");
                this.matriz.set(i,j,18);
                break;
            case 0:
                td.removeAttr("class");
                td.addClass("nothingCell");
                this.matriz.set(i,j,10);
                break;
            default:
                this.aciertos++;
                // no hacer nada, ya está resuelta...
        }
    }

    disparo(caja) {
        console.log("disparo");
        let cadena = caja.id;
        let pos = cadena.split("_");
        this.resuelveCelda(+pos[1],+pos[2]);
    }

    limpiaTablero() {
        if(this.caja_tablero!=undefined) {
            this.caja_tablero.empty();
            clearInterval(this.timer);
            this.caja_minas.html(this.matriz.getMinas());
        }
    }
}
```

[![Semana 6](http://img.youtube.com/vi/VbRxCefGE_A/0.jpg)](https://youtu.be/VbRxCefGE_A)
