

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonContent]
})
export class PreguntaPage implements OnInit {
[x: string]: any;
  public user: any; // Almacena los datos del usuario

  constructor(private router: Router) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.user = navigation.extras.state['usuario']; // Asegúrate de que 'usuario' esté correcto
      console.log('Usuario encontrado:', this.user); // Debugging: verifica que el usuario esté presente
    } else {
      this.router.navigate(['/ingreso']); // Redirige si no se recibe 'state'
    }
  }

  // Método para validar la respuesta secreta
  public validarRespuestaSecreta(respuestaIngresada: string | null): void {
    const respuestaSecreta = this.user?.secretAnswer?.toLowerCase(); // Normaliza la respuesta secreta
  
    console.log('Respuesta ingresada:', respuestaIngresada); // Para verificar la respuesta ingresada
  
    if (respuestaIngresada && respuestaSecreta && respuestaSecreta === respuestaIngresada.toLowerCase()) {
      // Si la respuesta es correcta
      this.router.navigate(['/correcto'], {
        state: {
          password: this.user.password,
          nombre: this.user.firstName,
          apellido: this.user.lastName
        }
      });
    } else {
      // Si la respuesta es incorrecta, o respuesta ingresada es null
      this.router.navigate(['/incorrecto']);
    }
  }
  
}
