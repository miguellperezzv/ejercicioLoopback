import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class MensajeEmpleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<MensajeEmpleado>) {
    super(data);
  }
}

export interface MensajeEmpleadoRelations {
  // describe navigational properties here
}

export type MensajeEmpleadoWithRelations = MensajeEmpleado & MensajeEmpleadoRelations;
