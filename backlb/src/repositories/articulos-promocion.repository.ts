import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {ArticulosPromocion, ArticulosPromocionRelations} from '../models';

export class ArticulosPromocionRepository extends DefaultCrudRepository<
  ArticulosPromocion,
  typeof ArticulosPromocion.prototype.codArticulo,
  ArticulosPromocionRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(ArticulosPromocion, dataSource);
  }
}
