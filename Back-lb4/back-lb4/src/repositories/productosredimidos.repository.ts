import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Productosredimidos, ProductosredimidosRelations} from '../models';

export class ProductosredimidosRepository extends DefaultCrudRepository<
  Productosredimidos,
  typeof Productosredimidos.prototype.id_producto_redimido,
  ProductosredimidosRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(Productosredimidos, dataSource);
  }
}
