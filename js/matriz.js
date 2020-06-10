/**
 * Librería JavaScript para el manejo de Matrices 2D
 * Ejemplo de uso: 
 * let mi_matriz = new Matriz(10, 10);
 * mi_matriz.inicializa();
 * mi_matriz.ponMinas(20);
 * mi_matriz.ponContadores();
 * 
 * 
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
     * Métodos para mostrar celdas vacías(sin números ni minas)
     */
    checkNorte(i,j){
        return this._data[i-1][j];
    }
    checkNO(i,j){
        return this._data[i-1][j-1];
    }
    checkNE(i,j){
        return this._data[i-1][j+1];
    }
    checkEste(i,j){
        return this._data[i][j+1];
    }
    checkSE(i,j){
        return this._data[i+1][j+1];
    }
    checkSur(i,j){
        return this._data[i+1][j];
    }
    checkSO(i,j){
        return this._data[i+1][j-1];
    }
    checkOeste(i,j){
        return this._data[i][j-1];
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
