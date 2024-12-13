import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentOutline, homeOutline, pawOutline, pencilOutline, peopleOutline, qrCodeOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio AuthService

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonFooter,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonIcon
  ]
})
export class FooterComponent {
  selectedButton = 'welcome';  // Aseguramos que el valor por defecto sea 'welcome'
  isScanning = false;
  currentUser: string = ''; // Nombre del usuario actual

  @Output() footerClick = new EventEmitter<string>();

  constructor(private authService: AuthService) { 
    addIcons({ homeOutline, qrCodeOutline, pawOutline, pencilOutline, peopleOutline, documentOutline });

    // Inicializa el usuario actual
    this.authService.authUser.subscribe(user => {
      this.currentUser = user ? user.userName : ''; // Asigna el nombre de usuario al campo currentUser
    });
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }
}
