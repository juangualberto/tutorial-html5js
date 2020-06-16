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
            id_carita="#carita", id_puntuaciones="#puntuaciones"){ //, id_tablero="#tablero"){
        this.caja_tiempo=$(id_tiempo);
        this.caja_minas=$(id_minas);
        this.caja_carita=$(id_carita);
        this.caja_puntuaciones=$(id_puntuaciones);   
        // this.caja_tablero=$(id_tablero);
        this.marcadores = new Marcadores();
        this.caja_puntuaciones.html(this.marcadores.getTabla());
        this.timer=null;
    }

    /**
     * Establece la caja donde vamos a colgar el tablero.
     * @param {DIV} id_tablero 
     */
    setTablero(id_tablero){
        this.old_caja_tablero = this.caja_tablero;
        this.caja_tablero = $(id_tablero);
    }

    /**
     * Arranca una nueva partida
     * @param {number} filas 
     * @param {number} columnas 
     * @param {number} minas 
     */
    partida(filas=10, columnas=10, minas=20){
        if (this.old_caja_tablero==undefined) {
            this.old_caja_tablero = $(this.id_tablero);
        } else {
            this.old_caja_tablero.empty();
        }
        this.caja_carita.removeAttr('class');
        this.caja_carita.addClass('caraBanderita');
        if ( this.matriz != undefined) {
            delete this.matriz;
        }
        this.matriz = new Matriz(filas, columnas);
        this.matriz.ponMinas(minas);
        this.minas = minas;
        this.filas = filas;
        this.columnas = columnas;
        this.aciertos = filas*columnas-minas;
        this.matriz.ponContadores();
        this.disparos = 0;
        this.caja_minas.html(minas);
        this.caja_tiempo.html(0);
        this.fin = false;
        this.perder = false;
        this.pintaTablero();
        // this.resuelve();

        clearInterval(this.timer);
        this.timer = setInterval(function(data){
            data.html( +(data.html())+ 1);
        }, 1000, this.caja_tiempo);
        
        this.matriz.imprimeMatriz();
    }

    /**
     * Destapa el tablero 
     * @param {boolean} perder 
     */
    resuelve(perder){
        this.fin = true;
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

    guardarPuntos(){
        let filas =  this.filas;
        let columnas = this.columnas;
        let tiempo = (+this.caja_tiempo.html());
        let puntos = Math.floor( (this.minas*this.minas)/(filas*columnas*tiempo)*100000);
        this.marcadores.load();
        this.marcadores.addMarcador($('#nombreJugador').val(), 
            puntos, tiempo, filas, 
            columnas, this.minas);
        $('#puntosJugador').html(puntos);
        $('#tiempoJugador').html(tiempo);
        
        this.caja_puntuaciones.html(this.marcadores.getTabla());
        console.log(this.marcadores.getTabla());
    }

    cambiaBandera(caja){
        let seleccion = $("#"+caja.id);
        console.log(seleccion);
        if (seleccion.hasClass("vacio")) {
            seleccion.removeAttr("class");
            seleccion.addClass("bandera");
        } else {
            if (seleccion.hasClass("bandera")) {
                seleccion.removeAttr("class");
                seleccion.addClass("vacio");
            }
        }
    }

    resuelveCelda(i,j){
        
        if (this.aciertos>0){
            this.aciertos--;
            this.cambiaClase(i,j);
        } 
       
        if (!this.perder && this.disparos >= ((this.filas*this.columnas)-this.minas)){
             // hemos ganado!!
                this.resuelve(false);
                clearInterval(this.timer);
                this.caja_carita.removeAttr('class');
                this.caja_carita.addClass('caraGanar');
                // alert("Has ganado!!!");
                let tiempo = (+this.caja_tiempo.html());
                let filas =  this.filas;
                let columnas = this.columnas;
                let puntos = Math.floor( (this.minas*this.minas)/(filas*columnas*tiempo)*100000);
                $('#puntosJugador').html(puntos);
                $('#tiempoJugador').html(tiempo);
                $("#modalGanar").modal();
        } 

        if (this.matriz.get(i,j)==10 && !this.fin) {
            console.log("Abriendo vacíos...");
            if (i>0 && j>=0) {
                if (this.matriz.get(i-1,j)<10)
                    this.resuelveCelda(i-1, j);
            } 
            if (i>=0 && j>0) {
                if (this.matriz.get(i,j-1)<10)
                    this.resuelveCelda(i, j-1);
            }
            if (i>0 && j>0) {
                if (this.matriz.get(i-1,j-1)<10)
                    this.resuelveCelda(i-1, j-1);
            }
            if (i>0 && (j+1)<this.matriz.getColumnas()) {
                if (this.matriz.get(i-1,j+1)<10)
                    this.resuelveCelda(i-1, j+1);
            }
            if ((i+1)<this.matriz.getFilas() && j>0) {
                if (this.matriz.get(i+1,j-1)<10)
                    this.resuelveCelda(i+1, j-1);
            }
            if ((i+1)<this.matriz.getFilas() && j<this.matriz.getColumnas()){
                if (this.matriz.get(i+1,j)<10)
                    this.resuelveCelda(i+1, j);
            }
            if (i<this.matriz.getFilas() && (j+1)<this.matriz.getColumnas()){
                if (this.matriz.get(i,j+1)<10)
                    this.resuelveCelda(i, j+1);
            }
            if ((i+1)<this.matriz.getFilas() && (j+1)<this.matriz.getColumnas()){
                if (this.matriz.get(i+1,j+1)<10)
                    this.resuelveCelda(i+1, j+1);
            }
            if (i>0 && j>0) {
                if (this.matriz.get(i-1,j-1)<10)
                    this.resuelveCelda(i-1, j-1);
            }
        }
        
    }

    cambiaClase(i,j){
        if (this.matriz.get(i,j)<10) {
            this.disparos++;
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
                this.perder = true;
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
        // console.log("disparo"+caja);
        let cadena = caja.id;
        let pos = cadena.split("_");
        this.resuelveCelda(+pos[1],+pos[2]);
        // this.disparos++;
    }

    limpiaTablero() {
        if(this.caja_tablero!=undefined) {
            this.caja_tablero.empty();
            clearInterval(this.timer);
            this.caja_minas.html(this.matriz.getMinas());
        }
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

}