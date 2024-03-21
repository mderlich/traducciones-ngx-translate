import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

    //solo para pruebas...
    langS = localStorage.getItem('lang'); // lang (S)torage
    langN = navigator.language   // lang (N)avigator
    // -------------------

  lang:string = '';

  // para las traducciones...
  constructor(private translateService:TranslateService){

  }

  ngOnInit(): void {
    //this.lang = localStorage.getItem('lang') || 'en';
    this.lang = localStorage.getItem('lang') || ((navigator.language.toLowerCase().startsWith('es')) ? 'es' : 'en');
  

    
  }

  
  ChangeLang(lang:any){
    const selectedLanguage = lang.target.value;
    this.langS = selectedLanguage; // <== empleado en prueba nomas, luego no se emplea

    // para darle persistencia ante un F5
    localStorage.setItem('lang', selectedLanguage)

    this.translateService.use(selectedLanguage);
  }
}
