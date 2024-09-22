import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {
usuario: any;
  router: any;
navegar(pagina: string) {
  
  this.router.navigate([pagina]);


}

  constructor() { }

  ngOnInit() {
  }

}
