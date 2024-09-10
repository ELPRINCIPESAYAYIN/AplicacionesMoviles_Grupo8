
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { AlertController, AnimationController } from '@ionic/angular';

import { NivelEducacional } from 'src/app/model/nivel-educacional';

import { Usuario } from 'src/app/model/usuario';



@Component({

 selector: 'app-home',

 templateUrl: 'inicio.page.html',

 styleUrls: ['inicio.page.scss'],

})

export class InicioPage implements OnInit, AfterViewInit {



 @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

 @ViewChild('page', { read: ElementRef }) page!: ElementRef;

 @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;

 @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;

 @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;

 @ViewChild('itemFecNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;



 public usuario: Usuario = new Usuario(

  '', '', '', '', '', '', '',

  NivelEducacional.findNivelEducacionalById(1)!,

  undefined

 );



 public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();



 constructor(

  private alertController: AlertController,

  private activatedRoute: ActivatedRoute,

  private router: Router,

  private animationController: AnimationController

 ) {}



 ngOnInit(): void {

  this.activatedRoute.queryParams.subscribe(params => {

   const nav = this.router.getCurrentNavigation();

   if (nav && nav.extras && nav.extras.state) {

    this.usuario = nav.extras.state['usuario'];

   } else {

    this.router.navigate(['/login']);

   }

  });

 }



 ngAfterViewInit(): void {

  if (this.itemTitulo) {

   const animation = this.animationController

    .create()

    .addElement(this.itemTitulo.nativeElement)

    .iterations(Infinity)

    .duration(6000)

    .fromTo('transform', 'translate(0%)', 'translate(100%)')

    .fromTo('opacity', 0.2, 1);

   animation.play();

  }

 }



 public limpiar1(): void {

  this.usuario.cuenta = '';

  this.usuario.nombre = '';

  this.usuario.apellido = '';

  this.usuario.nivelEducacional = NivelEducacional.findNivelEducacionalById(1)!; // Ensure this is valid

  this.usuario.fechaNacimiento = undefined;



  if (this.itemCuenta && this.itemNombre && this.itemApellido && this.itemFechaNacimiento) {

   this.animateItem1(this.itemCuenta.nativeElement, 1000);

   this.animateItem1(this.itemNombre.nativeElement, 1000);

   this.animateItem1(this.itemApellido.nativeElement, 1000);

   this.animateItem1(this.itemFechaNacimiento.nativeElement, 1000);

  }

 }



 public limpiar2(): void {

  // Implementation here

 }



 public animateItem1(elementRef: any, duration: number): void {

  const animation = this.animationController

   .create()

   .addElement(elementRef)

   .iterations(1)

   .duration(duration)

   .fromTo('transform', 'translate(100%)', 'translate(0%)');

  animation.play();

 }



 public animateItem2(elementRef: any, duration: number): void {

  const animation = this.animationController

   .create()

   .addElement(elementRef)

   .iterations(1)

   .duration(duration)

   .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)');

  animation.play();

 }



 createPageTurnAnimation(): void {

  const animation = this.animationController

   .create()

   .addElement(this.page.nativeElement)

   .iterations(1)

   .duration(1000)

   .fromTo('transform', 'rotateY(-180deg)', 'rotateY(0deg)');

  animation.play();

 }



 public mostrarDatosPersona(): void {

  if (this.usuario.cuenta.trim() === '') {

   this.presentAlert('Datos personales',

    'Para mostrar los datos de la persona, debe ingresar su cuenta.');

   return;

  }



  if (this.usuario.nombre.trim() === '' && this.usuario.apellido.trim() === '') {

   this.presentAlert('Datos personales',

    'Para mostrar los datos de la persona, al menos debe tener un valor para el nombre o el apellido.');

   return;

  }



  const mensaje = `

   <small>

    <br>Cuenta: ${this.usuario.cuenta}

    <br>Usuario: ${this.usuario.correo}

    <br>Nombre: ${this.usuario.nombre}

    <br>Apellido: ${this.usuario.apellido}

    <br>Educación: ${this.usuario.getTextoNivelEducacional()}

    <br>Nacimiento: ${this.formatDateDDMMYYYY(this.usuario.fechaNacimiento)}

   </small>

  `;

  this.presentAlert('Datos personales', mensaje);

 }



 public async presentAlert(titulo: string, mensaje: string): Promise<void> {

  const alert = await this.alertController.create({

   header: titulo,

   message: mensaje,

   buttons: ['OK']

  });



  await alert.present();

 }



 public formatDateDDMMYYYY(date: Date | undefined): string {

  if (!date) return 'No asignada';

  const day = date.getDate().toString().padStart(2, '0');

  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  const year = date.getFullYear();

  return `${day}/${month}/${year}`;

 }

}