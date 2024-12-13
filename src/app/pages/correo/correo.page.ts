import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { IonContent, IonCardContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonCardContent, IonContent, IonInput, IonContent, IonCard, IonCardHeader, IonButton, IonCardSubtitle, IonCardTitle, IonCardContent] // Asegúrate de agregar aquí los componentes de Ionic
})
export class CorreoPage {
  public correo: string = '';

  constructor(private router: Router, private alertController: AlertController, private db: DatabaseService) { }

  actualizarCorreo(event: any) {
    this.correo = event.target.value; // Captura el valor del input
  }

  async mostrarMensajeAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  public async ingresarCorreo(): Promise<void> {
    const findUser = await this.db.findUserByEmail(this.correo); 
  
    console.log(`Buscando correo: ${this.correo}`);
    console.log(`Usuario encontrado: `, findUser);
  
    if (!findUser) {
      this.router.navigate(['/correo-incorrecto']);
    } else if (!findUser.userName) { // Verifica que tenga userName
      this.mostrarMensajeAlerta('El usuario no tiene un nombre de usuario definido.');
    } else {
      const navigationExtras = {
        state: {
          usuario: findUser,
        },
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }
}

