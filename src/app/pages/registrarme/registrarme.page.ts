import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EducationalLevel } from 'src/app/model/educational-level';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class RegistrarmePage {
  usuario: User = new User(); // Inicializamos un objeto de tipo 'User'
  public listaNivelesEducacionales = EducationalLevel.getLevels(); // Lista de niveles educacionales

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  // Función que se llama al presionar el botón "Crear Cuenta"
  async crearCuenta() {
    const password = this.usuario.password.trim();
    const confirmPassword = this.usuario.confirmPassword.trim();

    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Validación de campos vacíos
    if (this.usuario.userName.trim() === '' || this.usuario.email.trim() === '') {
      this.presentAlert('Error', 'Por favor, complete todos los campos requeridos.');
      return;
    }

    // Validación de correo electrónico
    if (!this.isValidEmail(this.usuario.email)) {
      this.presentAlert('Error', 'Por favor ingrese un correo electrónico válido.');
      return;
    }

    // Validamos que la fecha de nacimiento esté en el formato correcto (YYYY-MM-DD)
    const dateOfBirthString = this.usuario.dateOfBirth instanceof Date 
      ? this.usuario.dateOfBirth.toISOString().split('T')[0] 
      : this.usuario.dateOfBirth; // Convertir la fecha a string en formato "YYYY-MM-DD"
    
    if (!this.isValidDate(dateOfBirthString)) {
      this.presentAlert('Error', 'La fecha de nacimiento es inválida.');
      return;
    }

    // Convertimos la fecha seleccionada al formato dd/mm/yyyy solo para enviarla (si es necesario)
    const formattedDateOfBirth = this.convertDateToString(this.usuario.dateOfBirth);

    // Intentar registrar al usuario
    try {
      // Pasamos la fecha en el formato adecuado si es necesario en el backend
      this.usuario.dateOfBirth = new Date(formattedDateOfBirth);  // Convertirla nuevamente a Date
      const isRegistered = await this.authService.register(this.usuario);
      if (isRegistered) {
        this.presentToast('Cuenta creada con éxito');
        this.router.navigate(['/login']);
      } else {
        this.presentAlert('Error', 'El correo electrónico ya está registrado');
      }
    } catch (error) {
      this.presentAlert('Error', 'Hubo un problema al crear la cuenta. Intenta de nuevo.');
    }
  }

  // Función para validar el correo electrónico
  isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Función para validar la fecha de nacimiento
  isValidDate(date: string): boolean {
    // Comprobamos que la fecha esté en el formato correcto YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  }

  // Función para convertir la fecha al formato dd/mm/yyyy
  convertDateToString(date: Date): string {
    const actualDate = new Date(date); // Aseguramos que sea un objeto Date
    const day = actualDate.getDate().toString().padStart(2, '0');
    const month = (actualDate.getMonth() + 1).toString().padStart(2, '0');
    const year = actualDate.getFullYear();
    return `${day}/${month}/${year}`; // Retornamos en formato dd/mm/yyyy
  }

  // Función para mostrar un mensaje emergente (alerta)
  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Función para mostrar un mensaje emergente (toast)
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  navigateToLogin() {
    this.router.navigate(['/ingreso']);
  }

  
}
