import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Seccion, SeccionRelations} from '../models';

export class SeccionRepository extends DefaultCrudRepository<
  Seccion,
  typeof Seccion.prototype.id_Seccion,
  SeccionRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(Seccion, dataSource);
  }
}
