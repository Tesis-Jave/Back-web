import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Tarjetascontpromociones, TarjetascontpromocionesRelations, Cafeteria, Tarjetas, Articulos, Productosredimidos} from '../models';
import {CafeteriaRepository} from './cafeteria.repository';
import {TarjetasRepository} from './tarjetas.repository';
import {ProductosredimidosRepository} from './productosredimidos.repository';
import {ArticulosRepository} from './articulos.repository';

export class TarjetascontpromocionesRepository extends DefaultCrudRepository<
  Tarjetascontpromociones,
  typeof Tarjetascontpromociones.prototype.id_transaccion,
  TarjetascontpromocionesRelations
> {

  public readonly cafeteria: BelongsToAccessor<Cafeteria, typeof Tarjetascontpromociones.prototype.id_transaccion>;

  public readonly tarjeta: BelongsToAccessor<Tarjetas, typeof Tarjetascontpromociones.prototype.id_transaccion>;

  public readonly articulosredimidos: HasManyThroughRepositoryFactory<Articulos, typeof Articulos.prototype.id_articulo,
          Productosredimidos,
          typeof Tarjetascontpromociones.prototype.id_transaccion
        >;

  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource, @repository.getter('CafeteriaRepository') protected cafeteriaRepositoryGetter: Getter<CafeteriaRepository>, @repository.getter('TarjetasRepository') protected tarjetasRepositoryGetter: Getter<TarjetasRepository>, @repository.getter('ProductosredimidosRepository') protected productosredimidosRepositoryGetter: Getter<ProductosredimidosRepository>, @repository.getter('ArticulosRepository') protected articulosRepositoryGetter: Getter<ArticulosRepository>,
  ) {
    super(Tarjetascontpromociones, dataSource);
    this.articulosredimidos = this.createHasManyThroughRepositoryFactoryFor('articulosredimidos', articulosRepositoryGetter, productosredimidosRepositoryGetter,);
    this.registerInclusionResolver('articulosredimidos', this.articulosredimidos.inclusionResolver);
    this.tarjeta = this.createBelongsToAccessorFor('tarjeta', tarjetasRepositoryGetter,);
    this.registerInclusionResolver('tarjeta', this.tarjeta.inclusionResolver);
    this.cafeteria = this.createBelongsToAccessorFor('cafeteria', cafeteriaRepositoryGetter,);
    this.registerInclusionResolver('cafeteria', this.cafeteria.inclusionResolver);
  }
}
