import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Articulos, ArticulosRelations, Seccion, Departamento, Promociones, Articulopromocion, Tarifasventa, Preciosventa} from '../models';
import {SeccionRepository} from './seccion.repository';
import {DepartamentoRepository} from './departamento.repository';
import {ArticulopromocionRepository} from './articulopromocion.repository';
import {PromocionesRepository} from './promociones.repository';
import {PreciosventaRepository} from './preciosventa.repository';
import {TarifasventaRepository} from './tarifasventa.repository';

export class ArticulosRepository extends DefaultCrudRepository<
  Articulos,
  typeof Articulos.prototype.id_articulo,
  ArticulosRelations
> {

  public readonly secciones: BelongsToAccessor<Seccion, typeof Articulos.prototype.id_articulo>;

  public readonly departamento: BelongsToAccessor<Departamento, typeof Articulos.prototype.id_articulo>;

  public readonly promociones: HasManyThroughRepositoryFactory<Promociones, typeof Promociones.prototype.id_promocion,
          Articulopromocion,
          typeof Articulos.prototype.id_articulo
        >;

  public readonly tarifasventas: HasManyThroughRepositoryFactory<Tarifasventa, typeof Tarifasventa.prototype.id_tarifa,
          Preciosventa,
          typeof Articulos.prototype.id_articulo
        >;

  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('ArticulopromocionRepository') protected articulopromocionRepositoryGetter: Getter<ArticulopromocionRepository>, @repository.getter('PromocionesRepository') protected promocionesRepositoryGetter: Getter<PromocionesRepository>, @repository.getter('PreciosventaRepository') protected preciosventaRepositoryGetter: Getter<PreciosventaRepository>, @repository.getter('TarifasventaRepository') protected tarifasventaRepositoryGetter: Getter<TarifasventaRepository>,
  ) {
    super(Articulos, dataSource);
    this.tarifasventas = this.createHasManyThroughRepositoryFactoryFor('tarifasventas', tarifasventaRepositoryGetter, preciosventaRepositoryGetter,);
    this.registerInclusionResolver('tarifasventas', this.tarifasventas.inclusionResolver);
    this.promociones = this.createHasManyThroughRepositoryFactoryFor('promociones', promocionesRepositoryGetter, articulopromocionRepositoryGetter,);
    this.registerInclusionResolver('promociones', this.promociones.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.secciones = this.createBelongsToAccessorFor('secciones', seccionRepositoryGetter,);
    this.registerInclusionResolver('secciones', this.secciones.inclusionResolver);
  }
}
