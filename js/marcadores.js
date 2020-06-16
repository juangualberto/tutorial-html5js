/**
 * Esta clase gestiona los marcadores de un juego en LocalStorage
 */
class Marcadores{

    /** 
     * Crea un objecto de tipo Marcadores
     * y carga la configuración inicial.
    */
    constructor(){
        this.lista = [];
        this.load();
    }

    /**
     * 
     * @param {string} nombre 
     * @param {number} puntos 
     * @param {number} tiempo 
     * @param {number} filas 
     * @param {number} columnas 
     * @param {number} minas 
     */
    addMarcador(nombre, puntos, tiempo, filas, columnas, minas){
        let marcador = {
            "nombre":nombre, // $("#nombre_jugador").val()   lee del formulario este input =>  <input id="nombre_jugador" type="text />
            "filas": filas, // (dentro de juego):  this.matriz.getFilas()
            "columnas": columnas, // (dentro de juego):  this.matriz.getComlunas()
            "minas": minas, // this.minas
            "tiempo": tiempo, // +this.caja_tiempo.html()
            "puntos": puntos // fórmula que calcula los puntos
        };
        console.log(marcador);
        this.lista.push(marcador);
        this.lista.sort(function(a, b){return b.puntos-a.puntos});
        this.save();
    }

    /** 
     * Carga de localStorage los marcadores.
    */
    load(){
        if(localStorage!=undefined) {
            let listado = JSON.parse(localStorage.getItem('puntuaciones'));
            if (listado!=null) {
                // sobra esta ordenación, porque ya lo hacemos al añadir
                listado.sort(function(a, b){return b.puntos-a.puntos});
                this.lista = listado;
            }
        } else {
            throw new Error("Marcadores::load:: Almacenamiento no disponible");
        }
    }

    /**
     * Guarda a localStorage los marcadores
     */
    save(){
        if (localStorage!=undefined) {
            localStorage.setItem('puntuaciones', JSON.stringify(this.lista)) ;
        } else {
            throw new Error("Marcadores::save:: Almacenamiento no disponible");
        }
    }

    /** 
     * Devuelve el código HTML de una tabla con los puntos
    */
    getTabla() {
        let html="<table class='table marcadores'>";
        html+="<thead><th>#</th><th>Nombre</th><th>Puntos</th><th>Tiempo</th></thead>";
        html+="<tbody>";
        // Pintamos sólo las 20 puntuaciones más altas
        let limite = this.lista.length > 20 ? 20 : this.lista.length;
        for (let i=0; i<limite; i++) {
            html+="<tr>";
            html+="<td>"+(i+1)+"</td>";
            html+="<td>"+this.lista[i].nombre+"</td>";
            html+="<td>"+this.lista[i].puntos+"</td>";
            html+="<td>"+this.lista[i].tiempo+"</td>";
            html+="</tr>";
        }
        html+="</tbody>";
        html+="</table>";
        return html;
    }

}