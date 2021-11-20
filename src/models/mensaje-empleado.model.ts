import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model({settings: {strict: false}})
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
  id_empleado: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @belongsTo(() => Empleado)
  empleadoId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MensajeEmpleado>) {
    super(data);
  }
}

export interface MensajeEmpleadoRelations {
  // describe navigational properties here
}

export type MensajeEmpleadoWithRelations = MensajeEmpleado & MensajeEmpleadoRelations;
