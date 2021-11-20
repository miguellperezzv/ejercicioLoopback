import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EcommercemusicaDataSource} from '../datasources';
import {Empleado, EmpleadoRelations} from '../models';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {
  constructor(
    @inject('datasources.ecommercemusica') dataSource: EcommercemusicaDataSource,
  ) {
    super(Empleado, dataSource);
  }
}
