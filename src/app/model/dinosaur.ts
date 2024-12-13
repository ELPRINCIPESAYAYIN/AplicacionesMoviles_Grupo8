import { showAlert, showAlertError } from "../tools/message-functions";

export class Dinosaur {

  static jsonDinoExample =
    `{
      "bloqueInicio": 7,
      "bloqueTermino": 9,
      "dia": "2022-08-09",
      "horaInicio": "13:00",
      "horaFin": "15:15",
      "idAsignatura": "PGY4121",
      "nombreAsignatura": "Aplicaciones Móviles",
      "nombreProfesor": "Cristián Gómez Vega",
      "seccion": "001D",
      "sede": "Alonso Ovalle"
    }`;

  static jsonDinoEmpty =
    `{
      "bloqueInicio": "",
      "bloqueTermino": "",
      "dia": "",
      "horaInicio": "",
      "horaFin": "",
      "idAsignatura": "",
      "nombreAsignatura": "",
      "nombreProfesor": "",
      "seccion": "",
      "sede": ""
    }`;

  bloqueInicio = '';
  bloqueTermino = '';
  dia = '';
  horaInicio = '';
  horaFin = '';
  idAsignatura = '';
  nombreAsignatura = '';
  nombreProfesor = '';
  seccion = '';
  sede = '';

  constructor() { }

  public static getNewDinosaur(
    bloqueInicio: string,
    bloqueTermino: string,
    dia: string,
    horaInicio: string,
    horaFin: string,
    idAsignatura: string,
    nombreAsignatura: string,
    nombreProfesor: string,
    seccion: string,
    sede: string
  ) {
    const dino = new Dinosaur();
    dino.bloqueInicio = bloqueInicio;
    dino.bloqueTermino = bloqueTermino;
    dino.dia = dia;
    dino.horaInicio = horaInicio;
    dino.horaFin = horaFin;
    dino.idAsignatura = idAsignatura;
    dino.nombreAsignatura = nombreAsignatura;
    dino.nombreProfesor = nombreProfesor;
    dino.seccion = seccion;
    dino.sede = sede;
    return dino;
  }

  // Devolver verdadero si el texto del QR contiene todos los datos de
  // un dinosaurio, de lo contrario se ha escaneado un QR que a lo
  // mejor es válido, pero es de otra cosa que no es un dinosaurio
  // de esta aplicación.

  static isValidDinosaurQrCode(qr: string) {
    if (qr === '') return false;

    try {
      const json = JSON.parse(qr);

      if (json.bloqueInicio !== undefined
        && json.bloqueTermino !== undefined
        && json.dia !== undefined
        && json.horaInicio !== undefined
        && json.horaFin !== undefined
        && json.idAsignatura !== undefined
        && json.nombreAsignatura !== undefined
        && json.nombreProfesor !== undefined
        && json.seccion !== undefined
        && json.sede !== undefined
      ) {
        return true;
      }
    } catch (error) { }

    showAlert('El código QR escaneado no corresponde a un Asistencia de Clases');
    return false;
  }

}
