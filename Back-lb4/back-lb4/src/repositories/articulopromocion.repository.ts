import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Articulopromocion, ArticulopromocionRelations} from '../models';

export class ArticulopromocionRepository extends DefaultCrudRepository<
  Articulopromocion,
  typeof Articulopromocion.prototype.id_articulopromocion,
  ArticulopromocionRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(Articulopromocion, dataSource);
  }
}
