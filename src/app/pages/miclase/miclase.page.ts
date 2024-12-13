import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
  standalone: true,
  imports: [IonicModule], 
})
export class MiclasePage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public user: User;
  currentPage: string = 'misclases';
  bloqueInicio: string = '';
  bloqueTermino: string = '';
  dia: string = '';
  horaInicio: string = '';
  horaFin: string = '';
  idAsignatura: string = '';
  nombreAsignatura: string = '';
  nombreProfesor: string = '';
  seccion: string = '';
  sede: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {
    // Creación de un nuevo objeto User, puedes poner aquí un usuario por defecto si lo deseas
    this.user = new User();
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    // Revisamos si la navegación lleva un estado
    if (navigation?.extras.state) {
      const state = navigation.extras.state;

      // Asignación de los datos recibidos en el estado de navegación
      this.bloqueInicio = state['bloqueInicio'] || 'Sin dato';
      this.bloqueTermino = state['bloqueTermino'] || 'Sin dato';
      this.dia = state['dia'] || 'Sin dato';
      this.horaInicio = state['horaInicio'] || 'Sin dato';
      this.horaFin = state['horaFin'] || 'Sin dato';
      this.idAsignatura = state['idAsignatura'] || 'Sin dato';
      this.nombreAsignatura = state['nombreAsignatura'] || 'Sin dato';
      this.nombreProfesor = state['nombreProfesor'] || 'Sin dato';
      this.seccion = state['seccion'] || 'Sin dato';
      this.sede = state['sede'] || 'Sin dato';

      // Guardamos los datos de la asistencia en localStorage
      const asistencia = {
        bloqueInicio: this.bloqueInicio,
        bloqueTermino: this.bloqueTermino,
        dia: this.dia,
        horaInicio: this.horaInicio,
        horaFin: this.horaFin,
        idAsignatura: this.idAsignatura,
        nombreAsignatura: this.nombreAsignatura,
        nombreProfesor: this.nombreProfesor,
        seccion: this.seccion,
        sede: this.sede
      };

      localStorage.setItem('asistenciaQR', JSON.stringify(asistencia));
    } else {
      // Si no hay estado de navegación, tratamos de leer los datos desde localStorage
      const savedAsistencia = localStorage.getItem('asistenciaQR');
      if (savedAsistencia) {
        const asistencia = JSON.parse(savedAsistencia);
        this.bloqueInicio = asistencia.bloqueInicio || 'Sin dato';
        this.bloqueTermino = asistencia.bloqueTermino || 'Sin dato';
        this.dia = asistencia.dia || 'Sin dato';
        this.horaInicio = asistencia.horaInicio || 'Sin dato';
        this.horaFin = asistencia.horaFin || 'Sin dato';
        this.idAsignatura = asistencia.idAsignatura || 'Sin dato';
        this.nombreAsignatura = asistencia.nombreAsignatura || 'Sin dato';
        this.nombreProfesor = asistencia.nombreProfesor || 'Sin dato';
        this.seccion = asistencia.seccion || 'Sin dato';
        this.sede = asistencia.sede || 'Sin dato';
      }
    }
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(-100%)', 'translate(100%)')
      .play();
  }

  desconectar() {
    // Eliminamos los datos almacenados en localStorage y redirigimos al login
    localStorage.removeItem('asistenciaQR');
    this.router.navigate(['login']);
  }

  navigateToleerqr() {
    // Navegamos a la ruta de leer QR
    this.router.navigate(['/leerqr']);
  }

  navigateTomiclase() {
    // Navegamos a la página de mi clase
    this.router.navigate(['/miclase']);
  }

  navigateTomisdatos() {
    // Navegamos a la página de mis datos
    this.router.navigate(['/misdatos']);
  }
}
