import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Seccion, SeccionRelations, Departamento, Articulos} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {ArticulosRepository} from './articulos.repository';

export class SeccionRepository extends DefaultCrudRepository<
  Seccion,
  typeof Seccion.prototype.id_seccion,
  SeccionRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Seccion.prototype.id_seccion>;

  public readonly articulos: HasManyRepositoryFactory<Articulos, typeof Seccion.prototype.id_seccion>;

  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('ArticulosRepository') protected articulosRepositoryGetter: Getter<ArticulosRepository>,
  ) {
    super(Seccion, dataSource);
    this.articulos = this.createHasManyRepositoryFactoryFor('articulos', articulosRepositoryGetter,);
    this.registerInclusionResolver('articulos', this.articulos.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
