import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {MensajeEmpleado} from '../models';
import {EmpleadoRepository, MensajeEmpleadoRepository} from '../repositories';

export class MensajeEmpleadoController {
  constructor(
    @repository(MensajeEmpleadoRepository)
    public mensajeEmpleadoRepository: MensajeEmpleadoRepository,
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,

  ) { }

  @post('/mensaje-empleados')
  @response(200, {
    description: 'MensajeEmpleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(MensajeEmpleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {
            title: 'NewMensajeEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    mensajeEmpleado: Omit<MensajeEmpleado, 'id'>,
  ): Promise<MensajeEmpleado> {
    //const accountSid = process.env.TWILIO_ACCOUNT_SID;
    //const authToken = process.env.TWILIO_AUTH_TOKEN;
    const accountSid = 'AC8487760c46e7e0cef31293983a196562';
    const authToken = '28cdb44eb966523375efc73d13d03243';
    console.log("ACCOUNT " + accountSid);
    console.log("token " + authToken);
    const client = require('twilio')(accountSid, authToken);

    let _empleado = await this.empleadoRepository.findById(mensajeEmpleado.empleadoId);
    let telefono = _empleado.telefono;
    console.log(_empleado + " empleado");
    console.log(telefono + " telefono");
    client.messages
      .create({

        body: mensajeEmpleado.mensaje,
        from: '+13099555530',
        to: '+57' + telefono
      })
    return this.mensajeEmpleadoRepository.create(mensajeEmpleado);
  }

  @get('/mensaje-empleados/count')
  @response(200, {
    description: 'MensajeEmpleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MensajeEmpleado) where?: Where<MensajeEmpleado>,
  ): Promise<Count> {
    return this.mensajeEmpleadoRepository.count(where);
  }

  @get('/mensaje-empleados')
  @response(200, {
    description: 'Array of MensajeEmpleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MensajeEmpleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MensajeEmpleado) filter?: Filter<MensajeEmpleado>,
  ): Promise<MensajeEmpleado[]> {

    return this.mensajeEmpleadoRepository.find(filter);
  }

  @patch('/mensaje-empleados')
  @response(200, {
    description: 'MensajeEmpleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {partial: true}),
        },
      },
    })
    mensajeEmpleado: MensajeEmpleado,
    @param.where(MensajeEmpleado) where?: Where<MensajeEmpleado>,
  ): Promise<Count> {
    return this.mensajeEmpleadoRepository.updateAll(mensajeEmpleado, where);
  }

  @get('/mensaje-empleados/{id}')
  @response(200, {
    description: 'MensajeEmpleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MensajeEmpleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MensajeEmpleado, {exclude: 'where'}) filter?: FilterExcludingWhere<MensajeEmpleado>
  ): Promise<MensajeEmpleado> {
    return this.mensajeEmpleadoRepository.findById(id, filter);
  }

  @patch('/mensaje-empleados/{id}')
  @response(204, {
    description: 'MensajeEmpleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {partial: true}),
        },
      },
    })
    mensajeEmpleado: MensajeEmpleado,
  ): Promise<void> {
    await this.mensajeEmpleadoRepository.updateById(id, mensajeEmpleado);
  }

  @put('/mensaje-empleados/{id}')
  @response(204, {
    description: 'MensajeEmpleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mensajeEmpleado: MensajeEmpleado,
  ): Promise<void> {
    await this.mensajeEmpleadoRepository.replaceById(id, mensajeEmpleado);
  }

  @del('/mensaje-empleados/{id}')
  @response(204, {
    description: 'MensajeEmpleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mensajeEmpleadoRepository.deleteById(id);
  }
}
