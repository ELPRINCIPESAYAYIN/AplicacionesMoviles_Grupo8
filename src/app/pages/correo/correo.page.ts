
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})


export class CorreoPage implements OnInit {

  public correo: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // public ingresarPaginaValidarRespuestaSecreta(): void {
  //  const usuario = new Usuario('','','','','','','','','',);
    
  //   const usuarioEncontrado = usuario.buscarUsuarioPorCorreo(this.correo);
  //   if (!usuarioEncontrado) {
  //     alert('EL CORREO NO EXISTE');
      
  //   }
  //   else {
  //     const navigationExtras: NavigationExtras = {
  //       state: {
  //         usuario: usuarioEncontrado
  //       }
  //     };
  //     this.router.navigate(['/pregunta'], navigationExtras);
  //   }
  // }
  public ingresarPaginaValidarRespuestaSecreta(): void {
   
    const usuarioEncontrado = Usuario.buscarUsuarioPorCorreo(this.correo);
    
    if (!usuarioEncontrado) {
        alert('este correo no existe');
    } else {
        const navigationExtras: NavigationExtras = {
            state: {
                usuario: usuarioEncontrado,
                preguntaSecreta:Usuario.preguntaSecreta

            }
        };
        this.router.navigate(['/pregunta'], navigationExtras);
    }
}

}
