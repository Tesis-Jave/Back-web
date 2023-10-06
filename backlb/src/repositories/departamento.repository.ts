import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Departamento, DepartamentoRelations} from '../models';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id_Dpto,
  DepartamentoRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(Departamento, dataSource);
  }
}
