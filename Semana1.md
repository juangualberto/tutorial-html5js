# Semana 1: HTML5 - Sintaxis básica y tablas

## ¿Cómo funciona Internet?



## Lenguajes de Marcas

HTML es un [lenguaje de marcas](https://es.wikipedia.org/wiki/Lenguaje_de_marcado), es decir, que usamos unas etiquetas predefinidas para dar estructura o significado al texto de la página.

Ejemplos:

```html
<h1> Esto es un título</h1>
<p> Esto es un párrafo </p>
```

[HTML5 es la última versión](https://developer.mozilla.org/es/docs/HTML/HTML5) de este lenguaje, que intenta diferenciarse de versiones anteriores porque sus etiquetas van tomando un valor más semántico (explican qué tipo de contenido contienen), dejando a las hojas de estilo ( [CSS3 o Cascade Style Sheets versión 3](https://developer.mozilla.org/es/docs/Archive/CSS3), ya las veremos más adelante).

## Primer ejemplo

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8"> 
    </head>
    <body>
        Aquí va el texto que vemos en el navegador.
    </body>
</html>
```

## Las nuevas etiquetas de HTML5

Como decíamos con anterioridad, HTML5 plantea un [nuevo esquema y secciones de un documento](https://developer.mozilla.org/es/docs/Sections_and_Outlines_of_an_HTML5_document): \<section>, \<article>, \<nav>, \<header>, \<footer>, \<aside>.

### Estructura básica

Sea el siguiente ejemplo adaptación de los [tutoriales de Mozilla](https://developer.mozilla.org/es/docs/Sections_and_Outlines_of_an_HTML5_document):

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8"> 
    </head>
    <body>
        <nav>

        </nav>
        <section>
            <h1>El fiero conejo</h1> 
        <section>
            <h1>Introducción</h1>
            <p>En esta sección presentamos al conocido mamífero.
        </section>
        <section>
            <h1>Hábitat</h1>
            <p>El conejo, como fiero depredador, necesita un entorno con abundantes zorros que cazar.
        </section>
        <aside>
            <p>otros estudiosos del conejo
        </aside>
        </section>
        <footer>
        <p>2010 The Example company
        </footer>
 </body>
</html>
```

En el anterior ejemplo tenemos que:

* La etiqueta \<!DOCTYPE html> indica que se trata de un documento HTML.
* La etiqueta \<html lang="es"> y su pareja que cierra al final \</html> sirven para indicar que dentro está el documento HTML. Fíjate en el atributo **lang="es"**, sirve para indicar que el documento está en español. Si lo cambiamos por **lang="en"**, ¿qué idioma crees que sería el del documento? Correcto, inglés (**En**glish).
* \<header> y \</header>: sirven para definir un bloque de contenido que hará las veces de título de la página web.
* \<footer> y \</footer>: define el pie de página de nuestra web.
* \<nav> y \</nav>: donde incluiremos diferentes enlaces para que el usuario pueda desplazarse entre las partes de nuestro sitio web.
* \<section> y \</section>: para definir grandes secciones de nuestra página.
* \<article> y \</article>: marca los límites de un contenido específico, como una entrada de un blog o un artículo en general.
* \<aside> y \</aside>: se emplea para definir un contenido que está relacionado con la página, pero que se debe considerar como separado del contenido principal.

![Esquema general de una página Web.](./docs/general_layout.gif "Estructura general de una página")

### Uso de audio y video en HTML5

Los elementos [\<audio>](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/audio) y [\<video>](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/video) permiten la manipulacion de nuevo contenido multimedia.

Imagina que tienes un vídeo que has grabado con el móvil en formato MP4 (Android) o MOV (iPhone), ¿cómo insertarlo en una página Web? Sencillo, sería algo así:

```html
    <video src="mi_pelicula.mp4" autoplay poster="imagen_inicial.jpg">
         Su navegador no soporta la etiqueta video.
    </video>
```

Si nuestro navegador es moderno, veremos el vídeo, en caso contrario veríamos el mensaje *"Su navegador no soporta la etiqueta video"*.

### Formularios en HTML5

[Mejora de los formularios web en HTML5](https://developer.mozilla.org/es/docs/HTML/HTML5/Formularios_en_HTML5): La API de validación de restricción, varios atributos nuevos, nuevos valores para \<input> como el atributo type y el nuevo elemento \<output>.

## Plantilla de una página Web con hiperenlaces

Ahora que hemos aprendido qué es eso del HMTL te proponemos el siguiente ejercicio: Vamos a crear una Web 