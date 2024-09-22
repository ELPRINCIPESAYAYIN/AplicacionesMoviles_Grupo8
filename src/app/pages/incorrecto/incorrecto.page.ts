import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {
usuario: any;
  router: any;
navegar(pagina: string) {
  
    this.router.navigate([pagina]);
  

}

  constructor() { }

  ngOnInit() {
  }

}

