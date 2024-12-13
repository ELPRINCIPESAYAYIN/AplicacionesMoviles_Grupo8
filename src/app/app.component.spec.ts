import { User } from 'src/app/model/user';
import { EducationalLevel } from './model/educational-level';

describe('Probar clase de usuario', () => {
  describe('Probar el método getDateOfBirth', () => {
    let usuario: User;

    beforeEach(() => {
      // Inicializa el usuario sin fecha de nacimiento
      usuario = User.getNewUsuario(
        'atorres',
        'atorres@duocuc.cl',
        '1234',
        '1234',
        '¿Cuál es tu animal favorito?',
        'gato',
        'Alison',
        'Garcia',
         new EducationalLevel(),
        undefined,  // No asignamos fecha de nacimiento aquí
        'calle ejemplo 321',
        ''
      );
    });

    it('Debería devolver la fecha formateada correctamente si se asigna una fecha válida', () => {
      usuario.dateOfBirth = new Date(1995, 10, 5); // 5 de noviembre de 1995
      const resultado = usuario.getDateOfBirth();
      expect(resultado).toBe('05/11/1995'); // Formato esperado
    });

    it('Debería devolver "No asignada" si la fecha de nacimiento no está asignada', () => {
      usuario.dateOfBirth = undefined;
      const resultado = usuario.getDateOfBirth();
      expect(resultado).toBe('No asignada');
    });

    it('Debería agregar ceros iniciales para días y meses de un solo dígito', () => {
      usuario.dateOfBirth = new Date(2023, 2, 9); // 9 de marzo de 2023
      const resultado = usuario.getDateOfBirth();
      expect(resultado).toBe('09/03/2023');
    });

    it('Debería manejar correctamente fechas antiguas', () => {
      usuario.dateOfBirth = new Date(1800, 0, 1); // 1 de enero de 1800
      const resultado = usuario.getDateOfBirth();
      expect(resultado).toBe('01/01/1800');
    });

    it('Debería devolver "No asignada" si la fecha de nacimiento es nula', () => {
      usuario.dateOfBirth = null as any; // Asignación nula
      const resultado = usuario.getDateOfBirth();
      expect(resultado).toBe('No asignada');
    });

    it('Debería devolver "No asignada" si dateOfBirth no es un objeto Date', () => {
      usuario.dateOfBirth = '1995-11-05' as any; // Asignación incorrecta
      const resultado = usuario.getDateOfBirth();
      expect(resultado).toBe('No asignada');
    });
  });
});
