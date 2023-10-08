import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Cafeteria, CafeteriaRelations} from '../models';

export class CafeteriaRepository extends DefaultCrudRepository<
  Cafeteria,
  typeof Cafeteria.prototype.id_Cafeteria,
  CafeteriaRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(Cafeteria, dataSource);
  }
}
