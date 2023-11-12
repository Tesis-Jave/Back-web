import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Preciosventa, PreciosventaRelations} from '../models';

export class PreciosventaRepository extends DefaultCrudRepository<
  Preciosventa,
  typeof Preciosventa.prototype.id_preciosventa,
  PreciosventaRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(Preciosventa, dataSource);
  }
}
