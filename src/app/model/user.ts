import { EducationalLevel } from './educational-level'; // Asegúrate de importar la clase correctamente
import { Person } from "./person";
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

export class User extends Person {
  userName = '';
  email = '';
  password = '';
  secretQuestion = '';
  secretAnswer = '';
  confirmPassword = ''; 
  image = '';
  override educationalLevel: EducationalLevel;  // Asegúrate de que esta propiedad esté correctamente inicializada
  override dateOfBirth: Date; // Asegúrate de que esta propiedad tenga un tipo definido

  constructor() {
    super();
    this.educationalLevel = new EducationalLevel(); // Inicialización por defecto
    this.dateOfBirth = new Date(1900, 0, 1); // Inicialización por defecto
  }

  static getNewUsuario(
    userName: string,
    email: string,
    password: string,
    confirmPassword: string, 
    secretQuestion: string,
    secretAnswer: string,
    firstName: string,
    lastName: string,
    educationalLevel: EducationalLevel,
    dateOfBirth: Date | undefined,
    address: string,
    image: string
  ) {
    let usuario = new User();
    usuario.userName = userName;
    usuario.email = email;
    usuario.password = password;
    usuario.confirmPassword = confirmPassword; 
    usuario.secretQuestion = secretQuestion;
    usuario.secretAnswer = secretAnswer;
    usuario.firstName = firstName;
    usuario.lastName = lastName;
    usuario.educationalLevel = educationalLevel || new EducationalLevel(); // Asigna un valor por defecto si es necesario
    usuario.dateOfBirth = dateOfBirth || new Date(1900, 0, 1); // Si no hay fecha válida, asigna una por defecto
    usuario.address = address;
    usuario.image = image;
    return usuario;
  }



  // Método toString para mostrar los datos del usuario
  override toString(): string {
    return `\n
        User name: ${this.userName}\n
        Email: ${this.email}\n
        Password: ${this.password}\n
        Confirm Password: ${this.confirmPassword}\n
        Secret Question: ${this.secretQuestion}\n
        Secret Answer: ${this.secretAnswer}\n
        First name: ${this.firstName}\n
        Last name: ${this.lastName}\n
        Education level: ${this.educationalLevel.getEducation()}\n
        Date of birth: ${this.getDateOfBirth()}\n
        Address: ${this.address}\n
        Image: ${this.image !== '' ? this.image : 'No image'}\n
    `;
  }
  
  // Método de validación de contraseña
  validarPassword(): string {
    if (!this.password) {
      return 'Para ingresar al sistema debe escribir la contraseña.';
    }
    if (!/^\d+$/.test(this.password)) {
      return 'La contraseña debe ser numérica.';
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }
  
  // Métodos de validación y lógica de usuario
  validarUsuario() {
    throw new Error('Method not implemented.');
  }

  navegarEnviandousuario(router: Router, arg1: string) {
    throw new Error('Method not implemented.');
  }
}
