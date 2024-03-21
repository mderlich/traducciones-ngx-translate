
**************************
NGX-TRANSLATE
**************************

ngx-translate es una librería muy popular en el ecosistema de Angular que se utiliza para gestionar la internacionalización (i18n) de una aplicación. Permite manejar de manera sencilla las traducciones de textos en diferentes idiomas dentro de una aplicación Angular.


ref video
https://www.youtube.com/watch?v=vSwYuyH4kMA
https://github.com/mderlich/traducciones-ngx-translate


**************************
PRUEBA
**************************

// this.lang = localStorage.getItem('lang') || ((navigator.language.toLowerCase().startsWith('es')) ? 'es' : 'en');

Asignación de idioma predeterminado:
1) Idioma almacenada en localStorage
2) Idioma en la configuración del idioma del navegador, si es español ('es'), caso contrario va en Ingles ('es') por defecto
(Imaginemos que entra un portugues o un italiano)

Para hacer pruebas de cambio de idioma...
http://localhost:4200/
chrome://settings/languages#lang


**************************
CONFIGURACION
**************************
Para usar ngx-translate en tu proyecto Angular, primero debes instalar la librería y luego configurarla en tu aplicación. Aquí te muestro los pasos básicos:




Instalacion
-----------------------------

npm install @ngx-translate/core --save

npm install @ngx-translate/http-loader --save



Configuración (app.module.ts)
-----------------------------

En el módulo principal de tu aplicación (por lo general, app.module.ts), importa ngx-translate y configúralo utilizando TranslateModule.forRoot() y HttpClientModule si necesitas cargar las traducciones desde un servidor.

// arriba...
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

// dentro del 'imports'

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }
    )


Uso en componentes
-------------------------------
En tus componentes donde necesites traducir textos, importa TranslateService y úsalo para obtener las traducciones según el idioma seleccionado.


import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tu-componente',
  templateUrl: './tu-componente.component.html',
  styleUrls: ['./tu-componente.component.css']
})
export class TuComponente {

  constructor(private translate: TranslateService) {
    // Configura el idioma por defecto y carga las traducciones
    translate.setDefaultLang('es');
    translate.use('es'); // Utiliza el idioma 'es' por defecto
  }

  cambiarIdioma(idioma: string) {
    this.translate.use(idioma); // Cambia el idioma de la aplicación
  }

}


uso en HTML
-------------------------------
En la plantilla HTML de tu componente, utiliza las claves de traducción dentro de las interpolaciones {{ }} para mostrar las traducciones correspondientes.

<h1>{{ 'titulo' | translate }}</h1>
<p>{{ 'subtitulo' | translate }}</p>
<button>{{ 'boton' | translate }}</button>

La expresión {{ 'titulo' | translate }} hace que ngx-translate busque la traducción de la clave 'titulo' según el idioma actualmente seleccionado.

.json
----------------
{
  "titulo": "Bienvenido a mi aplicación",
  "nosotros": {
    "tituloPortada": "Acerca de Nosotros",
    "historia": {
      "titulo": "NUESTRA HISTORIA",
      "descripcion": "Desde 1994, en <strong>Innovision</strong>..."
    }
  }
}

.html
----------------

{{'titulo'| translate}}

{{ 'menu.inicio' | translate }}

// para que se visualice el html se hace asi...
<p [innerHTML]="'nosotros.historia.descripcion' | translate"></p>

traducciones .json
-------------------------------
Crea archivos de traducción en JSON para cada idioma que desees soportar. Por ejemplo, es.json para español, en.json para inglés, etc. Estos archivos deben contener las traducciones correspondientes en formato clave-valor.

// es.json
{
  "titulo": "Bienvenido a mi aplicación",
  "boton": "Haz clic aquí"
}


// en.json
{
  "titulo": "Welcome to my application",
  "boton": "Click here"
}


IMPORTANTE: (assets/i18n/)
En un proyecto Angular estándar, la carpeta por defecto para almacenar los archivos de traducción de ngx-translate es src/assets/i18n/. Esta ubicación es una convención comúnmente utilizada para organizar los archivos de internacionalización (i18n) en proyectos Angular.

src/
  assets/
    i18n/
      en.json
      es.json

// si se cambiara la ruta, en app.module...
// return new TranslateHttpLoader(http, './assets/translations/');



**************************************



