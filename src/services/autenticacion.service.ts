import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/keys';
import {Empleado} from '../models/empleado.model';
import {EmpleadoRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(@repository(EmpleadoRepository)
  public empleadoRepository: EmpleadoRepository
  ) { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }


  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarEmpleado(usuario: string, clave: string) {
    try {
      let p = this.empleadoRepository.findOne({where: {correo: usuario, password: clave}})
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(empleado: Empleado) {
    let token = jwt.sign({
      data: {
        id: empleado.id,
        correo: empleado.correo,
        nombre: empleado.nombre + ' ' + empleado.apellido,

      }
    },
      Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
