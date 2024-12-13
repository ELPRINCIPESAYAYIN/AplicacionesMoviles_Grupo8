import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { IonLabel, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [ TranslateModule]
})
export class WelcomeComponent {

  user: User = new User();

  constructor(private auth: AuthService) {
    // Se suscribe al flujo del usuario en el servicio de autenticación
    this.auth.authUser.subscribe((user) => {
      console.log(user); // Si es necesario, puedes registrar el usuario aquí
      if (user) {
        this.user = user; // Asigna el usuario al componente
      }
    });
  }
}
