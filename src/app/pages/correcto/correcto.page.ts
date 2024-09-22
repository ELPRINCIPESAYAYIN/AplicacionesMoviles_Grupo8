import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
usuario: any;
  router: any;
navegar(pagina: string) {
  this.router.navigate([pagina]);
}

  constructor() { }

  ngOnInit() {
  }

}
