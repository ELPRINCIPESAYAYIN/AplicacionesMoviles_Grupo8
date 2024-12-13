import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonInput, IonRow, IonGrid, IonCardTitle, IonCard, IonLabel, IonButton, IonIcon, IonContent, IonList, IonItem, IonAvatar, IonCardHeader, IonCardContent, IonCol, IonHeader, IonToolbar,ToastController } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { trash, add } from 'ionicons/icons';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonHeader, IonCol, IonCardContent, IonCardHeader, 
    IonContent, IonRow,
    IonButton, IonIcon, IonCol, IonGrid,
    CommonModule, IonCard, IonCardTitle] 
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];
  currentUser: User | null = null;

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    addIcons({ add, trash });
  }

  // Al inicializar el componente, obtenemos el usuario autenticado
  async ngOnInit() {
    try {
      // Obtener los usuarios desde la base de datos
      this.usuarios = await this.databaseService.getAllUsers();
      
      // Obtener el usuario autenticado
      this.currentUser = await this.authService.readAuthUser(); // Asegúrate de que 'readAuthUser' esté implementado
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async deleteUser(userName: string) {
    try {
      // Verificar si el usuario autenticado es el que se intenta eliminar
      if (this.currentUser?.userName === userName) {
        if (this.currentUser.userName === 'admin') {
          // Mostrar mensaje Toast si el administrador intenta eliminarse a sí mismo
          await this.showToast('El administrador no puede eliminarse a sí mismo.', 'danger');
          return;
        }
      }

      // Mostrar mensaje de confirmación usando Toast (se simula la confirmación con un Toast)
      const toast = await this.toastController.create({
        message: '¿Estás seguro de que deseas eliminar este usuario?',
        position: 'top',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Eliminación cancelada');
            }
          },
          {
            text: 'Eliminar',
            handler: async () => {
              // Eliminar usuario
              await this.databaseService.deleteByUserName(userName);
              this.ngOnInit(); // Recarga la lista de usuarios después de eliminar
              await this.showToast('Usuario eliminado con éxito.', 'success');
            }
          }
        ]
      });

      await toast.present();

    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }

  // Función para mostrar Toast
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color, // 'danger' o 'success'
      position: 'top'
    });
    toast.present();
  }
}