<div style="display:none"> 
\pagebreak 
</div>

# Semana 5: JavaScript - Variables, clases, métodos y funciones

En esta semana vamos a aprender un poco más sobre variables, clases, métodos y funciones.

Conceptos clave:

1. **variable**: una zona de meoria donde almacenamos información de manera temporal. Se pueden definir usando *var*, *let* o *const*. Échale un ojo al apartado de los ámbitos para más información.
2. **objeto**: un objeto es una versión ampliada de una variable, es la representación interna en el ordenador de la información referente a algo que existe en el mundo real.
3. **función**: al igual que una sentencia o intrucción podría ser la mínima unidad de cómputo, una función debería ser una serie de bloques de código que engloban siempre las mismas instrucciones pero a los que podemos dar diferentes valores y así obtener diferentes resultados (ojo, las instrucciones o sentencias son siempre las mismas).
4. **clase**: De momento basta con que pensemos que será el esqueleto o patrón con el que vamos a crear objetos.
5. **método**: Para comunicarnos con los objetos, les pasamos mensajes. Para enviar o recibir un mensaje de un objeto, usaremos métodos.

## Introducción

### Ámbito de una variable

Podemos definir una variable con *var*, *let* y *const*. El último básicamente se usa cuando no vamos a cambiar el valor almacenado nunca, ejemplo:

```javascript
const pi = 3.14159
```

Ahora bien, no es lo mismo usar *var* que *let*: **var** declara una variable de ámbito global o local para la función sin importar el ámbito de bloque, además permite levantamiento o hoisting ; **let** declara una variable de ámbito global o local para la función o de bloque, es reasignable y *no* permite hoisting; **const** declara una variable de ámbito global, local para la función o de bloque; no es reasignable, pero es mutable y no permite hoisting.

| definición | ámbito | cambios | hoisting |
| --- | --- | --- | --- |
| var  | global, bloque y subloques  |   | sí  |
| let  | global, bloque y subloques  |   | sí  |
| const  | global, bloque y subloques  |   | no  |

```javascript
function test() {
    let saludo = "hola"; // local variable
}
test();
console.log(saludo); // ¡error!
```

En el código anterior, la variable *saludo* sólo existen dentro de la función test (fíjate cómo está dentro de unas llaves, de un bloque). La variable *saludo* sólo existirá dentro del bloque donde fue definida y, de haber subbloques dentro, también ahí (salvo que creemos otra que se llame igual).

```javascript
function comprueba1(booleano){
    let saludo = "Hola";
    if(booleano) {
        let saludo = "Adiós";
        console.log(saludo);
    }
    console.log(saludo);
}

function comprueba2(booleano){
    var saludo = "Hola";
    if(booleano) {
        var saludo = "Adiós";
        console.log(saludo);
    }
}

comprueba1(true);
comprueba2(true);
```

En la función *comprueba1()* dentro del *if* definimos una nueva variable que no afecta para nada a la anterior. Sin embargo en *comprueba2()* como está definido con **var** cuando dentro del *if* queremos definir una nueva variable, no es así, estamos machacando la anterior *saludo*.

![Ámbito de una varible con let y var: diferencias](./docs/consolelogambito.png)

> En JavaScript, las declaraciones (de variables o funciones) se mueven al principio de su ámbito. Este comportamiento se conoce como lecantamiento o hoisting y es muy importante tenerlo en cuenta a la hora de programar para prevenir posibles errores.
> 
> Teniendo en cuenta cómo funciona el hoisting, podemos llamar a una función y definirla más abajo, porque automáticamente JS la “subirá”.

### Listas

```javascript
let coches = ['VW', 'Seat', 'Audi', 'Porsche', 'Mercedes']

console.log(coches.length);
// 5
console.log(coches[0]);
// VW
console.log(coches[4]);
// Mercedes
```

### Diccionarios

```javascript
let persona = {
  "nombre": "John",
  "apellidos": "Doe",
  "edad" : 18
};

console.log(persona["nombre"]);
// Jonh
```

## Ejemplo de función: creando el tablero de juego

Entre los programadores de aplicaciones y páginas Web, hoy día es habitual que parte de la ventana que estamos viendo no cambia nunca y otra parte se va mostrando, ocultando o incluso variando su contenido. Técnicamente estaríamos hablando de una aplicación en una página (*single applicaton page o SAP*) que se comunica asíncronamente con un servidor y va modificando dinámicamente lo que vemos con funciones JavaScript.

Eso es lo que vamos a hacer nosotros en este ejemplo. Recuperamos nuestro *index.html* del BuscaMinas y añadimos estas cajas:

```html
// esto va justo después del <nav> </nav>
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

Añadimos el controlador. Este código es un objeto que se encarga de ir cambiando qué panel se ve en cada momento.

```javascript
// fichero js/controlador.js
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
    // console.log("cambio old::"+$.controller.active_panel+" new::"+panel_name);
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
    console.log("Panel inicial="+panel_inicial);
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
    $(panel_inicial).show();
    $.controller.active_panel = panel_inicial;

}
```

Como los componentes, valores por defecto, etc. los ponemos en el fichero *js/index.js* hay que decirle que arranque el controlador:

```javascript
/**
 * Cuando la página se ha cargado entera, comenzamos:
 *     -  Inicializamos componentes
 *     -  Configuramos opciones
 *     -  Cargamos valores por defecto
 *     -  Etc... 
 */
$(function() {
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
});
```



## Fichero Matriz.js

Esta semana tenemos que añadir un nuevo fichero a nuestro directorio "js" llamado "matriz.js" con el siguiente contenido:

```javascript
/**
 * Librería JavaScript para el manejo de Matrices 2D
 * Ejemplo de uso:
 * let mi_matriz = new Matriz(10, 10);
 * mi_matriz.inicializa();
 * mi_matriz.ponMinas(20);
 * mi_matriz.ponContadores();
 */

class Matriz {
    /**
     * Constructor, aloja espacio en memoria para 
     * una matriz de filas * columnas.
     *
     * @param {number} filas número de filas de la matriz. 
     * Si no se pasa valor (undefined) por defecto es 20.
     * @param {number} columnas número de columnas de la matriz.
     * Si no se pasa valor (undefined) por defecto es 20.
     */

    constructor(filas=20, columnas=20){
        this._filas = filas;
        this._columnas = columnas;
        this._data = [];
        for (let i=0; i<filas;i++){
            this._data.push(new Array(columnas).fill(0));
        }
    }

    /**
     * Método para (re)inicializar la matriz con un valor determinado.
     * Para el Buscaminas debe ser 0. Si no le pasamos nada por defecto 
     * será 0.
     *
     * @param {number} valor El dato con el que vamos a rellenar toda la matriz
     */
    incializa(valor){
        for(var i=0; i<this._data.length; i++) {
            // for (var j=0; j<this._data[i].length; j++) {
                this._data[i].fill(0);
            // }
        }
    }

    /**
     * Coloca n_minas (con valor -1) en la matriz.
     *
     * @param {number} n_minas número de minas a colocar. 
     */
    ponMinas(n_minas){
        // Como mínimo que tengamos que poner una mina
        let max_minas = Math.floor( (this._columnas * this._filas) / 3);
        if ( (n_minas >= 1) && (n_minas < max_minas) ) {
            this._minas=n_minas;
            do {
                // con LET estas variables sólo tienen como ámbito este bloque
                let pos_fil = this.dado(this._filas);
                let pos_col = this.dado(this._columnas);
                // console.log("Matriz::ponMinas: intentando colocar mina en: "+pos_fil+","+pos_col);
                // compruebo si no había mina previa
                if (this._data[pos_fil][pos_col]!=(-1)){
                    this._data[pos_fil][pos_col]=(-1);
                    n_minas--;
                }
            } while (n_minas>0);
        } else {
            // enviar mensaje de error
            throw new Error("Matriz::ponMinas:: número de minas no válido");
        }
    }

    /**
     * Este método genera un aleatorio entre 0 y valor-1
     *
     * @param {number} valor genera un aleatorio entre 0 y valor-1
     */
    dado(valor) {
        var tmp;
        tmp = Math.floor(Math.random()*valor);
        // console.log("DADO::"+tmp);
        return tmp;
    }

    /**
     * Métodos para hacer las comprobaciones acerca de las minas
     */
    miraNorte(i,j){
        return this._data[i-1][j]==-1?1:0;
    }
    miraNO(i,j){
        return this._data[i-1][j-1]==-1?1:0;
    }
    miraNE(i,j){
        return this._data[i-1][j+1]==-1?1:0;
    }
    miraEste(i,j){
        return this._data[i][j+1]==-1?1:0;
    }
    miraSE(i,j){
        return this._data[i+1][j+1]==-1?1:0;
    }
    miraSur(i,j){
        return this._data[i+1][j]==-1?1:0;
    }
    miraSO(i,j){
        return this._data[i+1][j-1]==-1?1:0;
    }
    miraOeste(i,j){
        return this._data[i][j-1]==-1?1:0;
    }

    /**
     * Este método pone los contadores de las minas 
     * que hay alrededor de cada casilla.
     */
    ponContadores(){
        for (let i=0; i<this._data.length; i++){
            for(let j=0; j<this._data[i].length; j++){
                if (this._data[i][j]!=-1) { // sólo si no hay mina hacemos las cuentas...
                    if (i==0) { // estamos en la primera fila
                        if (j==0) { // estamos en la primera columna
                            // miramos sólo a la derecha y abajo
                            this._data[i][j]+=this.miraEste(i,j);
                            this._data[i][j]+=this.miraSE(i,j);
                            this._data[i][j]+=this.miraSur(i,j);
                        } else {
                            if (j==(this._columnas-1)) { // estamos en la última columna
                                // miramos abajo y a izquierda
                                this._data[i][j]+=this.miraOeste(i,j);
                                this._data[i][j]+=this.miraSO(i,j);
                                this._data[i][j]+=this.miraSur(i,j);
                            } else { // estamos en las columnas centrales
                                // miramos a derecha, izquierda y abajo
                                this._data[i][j]+=this.miraOeste(i,j);
                                this._data[i][j]+=this.miraEste(i,j);
                                this._data[i][j]+=this.miraSO(i,j);
                                this._data[i][j]+=this.miraSE(i,j);
                                this._data[i][j]+=this.miraSur(i,j);
                            }
                        }
                    } else {
                        if (i==(this._filas-1)) { // estamos en la última fila
                            if (j==0) { // estamos en la primera columna
                                // miramos sólo arriba y derecha
                                this._data[i][j]+=this.miraNorte(i,j);
                                this._data[i][j]+=this.miraNE(i,j);
                                this._data[i][j]+=this.miraEste(i,j);
                            } else {
                                if (j==(this._columnas-1)) { // estamos en la última columna
                                    // miramos a la izquierda y arriba
                                    this._data[i][j]+=this.miraNorte(i,j);
                                    this._data[i][j]+=this.miraNO(i,j);
                                    this._data[i][j]+=this.miraOeste(i,j);
                                } else { // estamos en las columnas centrales
                                    // miramos a derecha, izquierda y arriba
                                    this._data[i][j]+=this.miraNorte(i,j);
                                    this._data[i][j]+=this.miraNO(i,j);
                                    this._data[i][j]+=this.miraOeste(i,j);
                                    this._data[i][j]+=this.miraEste(i,j);
                                    this._data[i][j]+=this.miraNE(i,j);
                                }
                            }
                        } else { // estamos en las filas centrales
                            if (j==0) { // estamos en la primera columna
                                // arriba, abajo y a la derecha
                                this._data[i][j]+=this.miraNorte(i,j);
                                this._data[i][j]+=this.miraSur(i,j);
                                this._data[i][j]+=this.miraSE(i,j);
                                this._data[i][j]+=this.miraEste(i,j);
                                this._data[i][j]+=this.miraNE(i,j);
                            } else {
                                if (j==(this._columnas-1)) { // estamos en la última columna
                                    // arriba, abajo y a la izquierda
                                    this._data[i][j]+=this.miraNorte(i,j);
                                    this._data[i][j]+=this.miraNO(i,j);
                                    this._data[i][j]+=this.miraOeste(i,j);
                                    this._data[i][j]+=this.miraSO(i,j);
                                    this._data[i][j]+=this.miraSur(i,j);

                                } else { // estamos en las columnas centrales
                                    // arriba, abajo, derecha e izquierda
                                    this._data[i][j]+=this.miraNorte(i,j);
                                    this._data[i][j]+=this.miraNO(i,j);
                                    this._data[i][j]+=this.miraOeste(i,j);
                                    this._data[i][j]+=this.miraSO(i,j);
                                    this._data[i][j]+=this.miraSur(i,j);
                                    this._data[i][j]+=this.miraSE(i,j);
                                    this._data[i][j]+=this.miraEste(i,j);
                                    this._data[i][j]+=this.miraNE(i,j);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Método para consultar la posición [i,j]
     * de la matriz del tablero del Buscaminas.
     * @param {number} i Posición de la fila en el tablero.
     * @param {number} j Posición de la columna en el tablero.
     */
    get(i,j){
        if (i>=0 && i<this._filas && j>=0 && j<this._columnas) {
            return this._data[i][j];
        } else {
            throw new Error("Matriz::get: Ha intentado acceder a una posición no válida.");
        }
    }

    /**
     * Método para almacenar un dato en la posición [i,j]
     * de la matriz del tablero del Buscaminas. Si no se 
     * pasa el parámetro dato por defecto será 0.
     * @param {number} i posición (fila)
     * @param {number} j posición (columna)
     * @param {number} dato Si no se indica, por defecto será 0.
     */
    set(i,j,dato=0) {
        if (i>=0 && i<this._filas && j>=0 && j<this._columnas) {
            this._data[i][j]=dato;
        } else {
            throw new Error("Matriz::set: Ha intentado acceder a una posición no válida.");
        }
    }

    getFilas(){
        return this._filas;
    }

    getColumnas(){
        return this._columnas;
    }

    getMinas(){
        return this._minas;
    }

    imprimeMatriz(){
        let texto="";
        for (let i=0; i<this._data.length; i++){
            for(let j=0; j<this._data[i].length; j++){
                texto += "\t"+this._data[i][j];
            }
            texto += "\n";
        }
        console.log(texto);
    }
};
```

## Ejercicio: Adivina en qué número pienso

Haz un programa que que nos proponga averiguar el número en el que estamos pensando. Cada vez que le demos un número, si no acertamos, nos avisará si es mayor o menor.

[![Semana 5](http://img.youtube.com/vi/lwFcnIOyyLI/0.jpg)](https://youtu.be/lwFcnIOyyLI)
