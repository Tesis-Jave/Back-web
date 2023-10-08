import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {TarjetasContPromociones, TarjetasContPromocionesRelations} from '../models';

export class TarjetasContPromocionesRepository extends DefaultCrudRepository<
  TarjetasContPromociones,
  typeof TarjetasContPromociones.prototype.id_transaccion,
  TarjetasContPromocionesRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(TarjetasContPromociones, dataSource);
  }
}
