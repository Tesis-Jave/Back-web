import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Tarjetas,
  Clientes,
} from '../models';
import {TarjetasRepository} from '../repositories';

export class TarjetasClientesController {
  constructor(
    @repository(TarjetasRepository)
    public tarjetasRepository: TarjetasRepository,
  ) { }

  @get('/tarjetas/{id}/clientes', {
    responses: {
      '200': {
        description: 'Clientes belonging to Tarjetas',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Clientes),
          },
        },
      },
    },
  })
  async getClientes(
    @param.path.number('id') id: typeof Tarjetas.prototype.id_tarjeta,
  ): Promise<Clientes> {
    return this.tarjetasRepository.cliente(id);
  }
}
