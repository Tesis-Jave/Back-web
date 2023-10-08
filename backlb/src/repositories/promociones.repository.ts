import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Promociones, PromocionesRelations} from '../models';

export class PromocionesRepository extends DefaultCrudRepository<
  Promociones,
  typeof Promociones.prototype.id_Promocion,
  PromocionesRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(Promociones, dataSource);
  }
}
