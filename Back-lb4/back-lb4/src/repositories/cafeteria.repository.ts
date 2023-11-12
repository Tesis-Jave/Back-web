import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Cafeteria, CafeteriaRelations, Tarifasventa, Tarjetascontpromociones} from '../models';
import {TarifasventaRepository} from './tarifasventa.repository';
import {TarjetascontpromocionesRepository} from './tarjetascontpromociones.repository';

export class CafeteriaRepository extends DefaultCrudRepository<
  Cafeteria,
  typeof Cafeteria.prototype.id_cafeteria,
  CafeteriaRelations
> {

  public readonly tarifa: BelongsToAccessor<Tarifasventa, typeof Cafeteria.prototype.id_cafeteria>;

  public readonly tarjetascontpromociones: HasManyRepositoryFactory<Tarjetascontpromociones, typeof Cafeteria.prototype.id_cafeteria>;

  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource, @repository.getter('TarifasventaRepository') protected tarifasventaRepositoryGetter: Getter<TarifasventaRepository>, @repository.getter('TarjetascontpromocionesRepository') protected tarjetascontpromocionesRepositoryGetter: Getter<TarjetascontpromocionesRepository>,
  ) {
    super(Cafeteria, dataSource);
    this.tarjetascontpromociones = this.createHasManyRepositoryFactoryFor('tarjetascontpromociones', tarjetascontpromocionesRepositoryGetter,);
    this.registerInclusionResolver('tarjetascontpromociones', this.tarjetascontpromociones.inclusionResolver);
    this.tarifa = this.createBelongsToAccessorFor('tarifa', tarifasventaRepositoryGetter,);
    this.registerInclusionResolver('tarifa', this.tarifa.inclusionResolver);
  }
}
