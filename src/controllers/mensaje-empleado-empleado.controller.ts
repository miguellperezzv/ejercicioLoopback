import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MensajeEmpleado,
  Empleado,
} from '../models';
import {MensajeEmpleadoRepository} from '../repositories';

export class MensajeEmpleadoEmpleadoController {
  constructor(
    @repository(MensajeEmpleadoRepository)
    public mensajeEmpleadoRepository: MensajeEmpleadoRepository,
  ) { }

  @get('/mensaje-empleados/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to MensajeEmpleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof MensajeEmpleado.prototype.id,
  ): Promise<Empleado> {
    return this.mensajeEmpleadoRepository.empleado(id);
  }
}
