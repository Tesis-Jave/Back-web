import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {ProductosRedimidos, ProductosRedimidosRelations} from '../models';

export class ProductosRedimidosRepository extends DefaultCrudRepository<
  ProductosRedimidos,
  typeof ProductosRedimidos.prototype.id_Articulo,
  ProductosRedimidosRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(ProductosRedimidos, dataSource);
  }
}
