import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButton, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CorrectoPage implements OnInit {

  public password: string | undefined;
  public nombre: string | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.password = navigation.extras.state['password'];
      this.nombre = navigation.extras.state['nombre'];
    } else {
      this.router.navigate(['/ingreso']); // Redirige si no se recibe 'state'
    }
  }
}
