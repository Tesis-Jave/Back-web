import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Perfil, PerfilRelations} from '../models';

export class PerfilRepository extends DefaultCrudRepository<
  Perfil,
  typeof Perfil.prototype.id_perfil,
  PerfilRelations
> {
  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource,
  ) {
    super(Perfil, dataSource);
  }
}
