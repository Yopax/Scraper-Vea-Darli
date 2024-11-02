## Paso 1
se crea la carpeta del proyecto y adentro la carpeta src
## Paso 2 
dentro de src se crea el primer archivo manifest.json y se le agrega su configuración
## Paso 3
dentro de src creamos el popup.html
## Paso 4 
dentro de src creamos el popup.js
## Paso 5
dentro de src creamos el popup.css
## Paso 6
dentro de src creamos el content.js
## Paso 7
en la carpeta raiz creamos el package.json y le agregamos la configuracion inicial.
## Paso 8
luego instalamos weckapage 
## Paso 9
crearemos los archivos de configuración de Webpack. Webpack utiliza un archivo de configuración para definir cómo empaquetar el proyecto. Crearemos dos configuraciones: una para desarrollo y otra para producción. Inicialmente, utilizaremos JavaScript para los archivos de configuración, pero los convertiremos a TypeScript más adelante.(webpack.common.js)
## Paso 11
Crea un webpack.dev.jsarchivo con la configuración de desarrollo
## Paso 12
Crea un webpack.prod.jsarchivo con la configuración de producción
## Paso 13
Refactorizaremos la estructura del directorio para separar el código fuente de los archivos estáticos. Crearemos un srcdirectorio y moveremos los archivos JavaScript ( background.js, content.js, popup.js) a él. Crearemos un staticdirectorio y moveremos los archivos manifest.json, popup.htmly popup.cssa él.
## Paso 14
Ahora, podemos ejecutar el paquete webpack usando el siguiente comando:

./node_modules/.bin/webpack --watch --config webpack.dev.js
Este comando crea un distdirectorio con los archivos incluidos. La --watchbandera le indica a webpack que continúe ejecutándose, que esté atento a los cambios y que vuelva a compilar los archivos cuando se produzcan cambios. Esta recompilación es crucial para el desarrollo, ya que nos permite ver los cambios en nuestro código en tiempo real.
## Paso 15
Ahora, podemos agregar scripts al package.jsonarchivo para simplificar la forma en que ejecutamos webpack:

4=16
6=24
5=20