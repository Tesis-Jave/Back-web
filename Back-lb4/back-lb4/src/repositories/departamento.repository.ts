import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Seccion, Articulos} from '../models';
import {SeccionRepository} from './seccion.repository';
import {ArticulosRepository} from './articulos.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id_dpto,
  DepartamentoRelations
> {

  public readonly secciones: HasManyRepositoryFactory<Seccion, typeof Departamento.prototype.id_dpto>;

  public readonly articulos: HasManyRepositoryFactory<Articulos, typeof Departamento.prototype.id_dpto>;

  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>, @repository.getter('ArticulosRepository') protected articulosRepositoryGetter: Getter<ArticulosRepository>,
  ) {
    super(Departamento, dataSource);
    this.articulos = this.createHasManyRepositoryFactoryFor('articulos', articulosRepositoryGetter,);
    this.registerInclusionResolver('articulos', this.articulos.inclusionResolver);
    this.secciones = this.createHasManyRepositoryFactoryFor('secciones', seccionRepositoryGetter,);
    this.registerInclusionResolver('secciones', this.secciones.inclusionResolver);
  }
}
