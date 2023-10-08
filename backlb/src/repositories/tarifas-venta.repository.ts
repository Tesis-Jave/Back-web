import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {TarifasVenta, TarifasVentaRelations} from '../models';

export class TarifasVentaRepository extends DefaultCrudRepository<
  TarifasVenta,
  typeof TarifasVenta.prototype.id_tarifa,
  TarifasVentaRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(TarifasVenta, dataSource);
  }
}
