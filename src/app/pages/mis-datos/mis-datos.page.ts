import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { APIClientService } from 'src/app/services/apiclient.service';
import { EducationalLevel } from 'src/app/model/educational-level';
import { showToast } from 'src/app/tools/message-functions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Asegúrate de importar IonicModule
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.page.html',
  styleUrls: ['./mis-datos.page.scss'],
  standalone: true,  // Marcamos el componente como standalone
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule] // Solo importamos lo necesario para el componente standalone
})
export class MisDatosPage implements OnInit {

  user: User = new User();
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();

  constructor(
    private bd: DatabaseService,
    private auth: AuthService,
    private api: APIClientService
  ) {}

  ngOnInit() {
    // Cargar usuario autenticado

   

    this.auth.readAuthUser().then((user) => {
      if (user) {
        this.user = user;
        console.log('User info loaded:', this.user);
      }
    });
  }

  guardaruser() {
    if (this.user.firstName.trim() === '' || this.user.lastName.trim() === '') {
      showToast('El nombre y apellido son obligatorios');
    } else if (this.user.email.trim() === '') {
      showToast('El correo es obligatorio');
    } else {
      console.log('Guardando usuario:', this.user);
      this.bd.saveUser(this.user);
      this.auth.saveAuthUser(this.user);  // Guardar el usuario autenticado en el servicio
      showToast('Los datos del usuario fueron guardados correctamente');
    }
  }

  public actualizarNivelEducacional(event: any) {
    const selectedLevelId = event.detail.value;
    const level = EducationalLevel.findLevel(selectedLevelId);
    this.user.educationalLevel = level ?? EducationalLevel.getLevels()[0];
  }

  onFechaNacimientoChange(event: any) {
    const selectedDate = event.detail.value;
    if (selectedDate) {
      this.user.dateOfBirth = new Date(selectedDate);
    }
  }
}
