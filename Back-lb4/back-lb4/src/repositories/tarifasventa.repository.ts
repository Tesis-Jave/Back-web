import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Tarifasventa, TarifasventaRelations, Cafeteria} from '../models';
import {CafeteriaRepository} from './cafeteria.repository';

export class TarifasventaRepository extends DefaultCrudRepository<
  Tarifasventa,
  typeof Tarifasventa.prototype.id_tarifa,
  TarifasventaRelations
> {

  public readonly cafeterias: HasManyRepositoryFactory<Cafeteria, typeof Tarifasventa.prototype.id_tarifa>;

  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource, @repository.getter('CafeteriaRepository') protected cafeteriaRepositoryGetter: Getter<CafeteriaRepository>,
  ) {
    super(Tarifasventa, dataSource);
    this.cafeterias = this.createHasManyRepositoryFactoryFor('cafeterias', cafeteriaRepositoryGetter,);
    this.registerInclusionResolver('cafeterias', this.cafeterias.inclusionResolver);
  }
}
