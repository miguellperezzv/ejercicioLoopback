import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empleado,
  MensajeEmpleado,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoMensajeEmpleadoController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/mensaje-empleados', {
    responses: {
      '200': {
        description: 'Array of Empleado has many MensajeEmpleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MensajeEmpleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MensajeEmpleado>,
  ): Promise<MensajeEmpleado[]> {
    return this.empleadoRepository.mensajeEmpleados(id).find(filter);
  }

  @post('/empleados/{id}/mensaje-empleados', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(MensajeEmpleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {
            title: 'NewMensajeEmpleadoInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) mensajeEmpleado: Omit<MensajeEmpleado, 'id'>,
  ): Promise<MensajeEmpleado> {
    return this.empleadoRepository.mensajeEmpleados(id).create(mensajeEmpleado);
  }

  @patch('/empleados/{id}/mensaje-empleados', {
    responses: {
      '200': {
        description: 'Empleado.MensajeEmpleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {partial: true}),
        },
      },
    })
    mensajeEmpleado: Partial<MensajeEmpleado>,
    @param.query.object('where', getWhereSchemaFor(MensajeEmpleado)) where?: Where<MensajeEmpleado>,
  ): Promise<Count> {
    return this.empleadoRepository.mensajeEmpleados(id).patch(mensajeEmpleado, where);
  }

  @del('/empleados/{id}/mensaje-empleados', {
    responses: {
      '200': {
        description: 'Empleado.MensajeEmpleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MensajeEmpleado)) where?: Where<MensajeEmpleado>,
  ): Promise<Count> {
    return this.empleadoRepository.mensajeEmpleados(id).delete(where);
  }
}
