import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {EcommercemusicaDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, MensajeEmpleado} from '../models';
import {MensajeEmpleadoRepository} from './mensaje-empleado.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly mensajeEmpleados: HasManyRepositoryFactory<MensajeEmpleado, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.ecommercemusica') dataSource: EcommercemusicaDataSource, @repository.getter('MensajeEmpleadoRepository') protected mensajeEmpleadoRepositoryGetter: Getter<MensajeEmpleadoRepository>,
  ) {
    super(Empleado, dataSource);
    this.mensajeEmpleados = this.createHasManyRepositoryFactoryFor('mensajeEmpleados', mensajeEmpleadoRepositoryGetter,);
    this.registerInclusionResolver('mensajeEmpleados', this.mensajeEmpleados.inclusionResolver);
  }
}
