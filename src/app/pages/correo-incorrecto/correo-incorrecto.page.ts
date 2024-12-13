import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-correo-incorrecto',
  templateUrl: './correo-incorrecto.page.html',
  styleUrls: ['./correo-incorrecto.page.scss'],
  standalone: true,
  imports: [IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonContent, CommonModule, FormsModule]
})
export class CorreoIncorrectoPage implements OnInit {

  constructor() { }

  ngOnInit() {  
  }

}
