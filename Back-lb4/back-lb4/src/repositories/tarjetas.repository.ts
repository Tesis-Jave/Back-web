import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqljpDataSource} from '../datasources';
import {Tarjetas, TarjetasRelations, Clientes, Tarjetascontpromociones} from '../models';
import {ClientesRepository} from './clientes.repository';
import {TarjetascontpromocionesRepository} from './tarjetascontpromociones.repository';

export class TarjetasRepository extends DefaultCrudRepository<
  Tarjetas,
  typeof Tarjetas.prototype.id_tarjeta,
  TarjetasRelations
> {

  public readonly cliente: BelongsToAccessor<Clientes, typeof Tarjetas.prototype.id_tarjeta>;

  public readonly tarjetascontpromociones: HasManyRepositoryFactory<Tarjetascontpromociones, typeof Tarjetas.prototype.id_tarjeta>;

  constructor(
    @inject('datasources.MySQLJP') dataSource: MySqljpDataSource, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>, @repository.getter('TarjetascontpromocionesRepository') protected tarjetascontpromocionesRepositoryGetter: Getter<TarjetascontpromocionesRepository>,
  ) {
    super(Tarjetas, dataSource);
    this.tarjetascontpromociones = this.createHasManyRepositoryFactoryFor('tarjetascontpromociones', tarjetascontpromocionesRepositoryGetter,);
    this.registerInclusionResolver('tarjetascontpromociones', this.tarjetascontpromociones.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clientesRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
