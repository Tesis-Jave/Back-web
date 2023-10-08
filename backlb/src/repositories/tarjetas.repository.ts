import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Tarjetas, TarjetasRelations} from '../models';

export class TarjetasRepository extends DefaultCrudRepository<
  Tarjetas,
  typeof Tarjetas.prototype.idTarjetas,
  TarjetasRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(Tarjetas, dataSource);
  }
}
