import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  navegar(pagina: string) {
    this.router.navigate([pagina]);
  }

  public usuario!: Usuario; 
  public respuesta: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras.state && nav.extras.state['usuario']) {
      this.usuario = nav.extras.state['usuario']; // Inicializa el usuario
    } else {
      // Redirigir si no hay usuario
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    if (this.usuario.respuestaSecreta === this.respuesta) {
      this.router.navigate(['/correcto']);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }
}