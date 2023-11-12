import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Clientes, ClientesRelations, Tarjetas} from '../models';
import {TarjetasRepository} from './tarjetas.repository';

export class ClientesRepository extends DefaultCrudRepository<
  Clientes,
  typeof Clientes.prototype.id_cliente,
  ClientesRelations
> {

  public readonly tarjetas: HasManyRepositoryFactory<Tarjetas, typeof Clientes.prototype.id_cliente>;

  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource, @repository.getter('TarjetasRepository') protected tarjetasRepositoryGetter: Getter<TarjetasRepository>,
  ) {
    super(Clientes, dataSource);
    this.tarjetas = this.createHasManyRepositoryFactoryFor('tarjetas', tarjetasRepositoryGetter,);
    this.registerInclusionResolver('tarjetas', this.tarjetas.inclusionResolver);
  }
}
