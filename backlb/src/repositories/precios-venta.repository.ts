import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {PreciosVenta, PreciosVentaRelations} from '../models';

export class PreciosVentaRepository extends DefaultCrudRepository<
  PreciosVenta,
  typeof PreciosVenta.prototype.id_Tarifa,
  PreciosVentaRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(PreciosVenta, dataSource);
  }
}
