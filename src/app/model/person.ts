import { EducationalLevel } from './educational-level';

export class Person {

  firstName = '';
  lastName = '';
  educationalLevel: EducationalLevel = EducationalLevel.findLevel(1)!;
  dateOfBirth: Date = new Date();
  address = '';

  constructor() { }
  getDateOfBirth(): string {
    if (!this.dateOfBirth || !(this.dateOfBirth instanceof Date) || isNaN(this.dateOfBirth.getTime())) {
      return 'No asignada';
    }

    // Formateo de la fecha a dd/MM/yyyy
    const day = ('0' + this.dateOfBirth.getDate()).slice(-2);
    const month = ('0' + (this.dateOfBirth.getMonth() + 1)).slice(-2);
    const year = this.dateOfBirth.getFullYear();

    return `${day}/${month}/${year}`;
  }
}  

