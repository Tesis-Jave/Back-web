import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Tarjetascontpromociones,
  Tarjetas,
} from '../models';
import {TarjetascontpromocionesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class TarjetascontpromocionesTarjetasController {
  constructor(
    @repository(TarjetascontpromocionesRepository)
    public tarjetascontpromocionesRepository: TarjetascontpromocionesRepository,
  ) { }

  @get('/tarjetascontpromociones/{id}/tarjetas', {
    responses: {
      '200': {
        description: 'Tarjetas belonging to Tarjetascontpromociones',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tarjetas),
          },
        },
      },
    },
  })
  async getTarjetas(
    @param.path.number('id') id: typeof Tarjetascontpromociones.prototype.id_transaccion,
  ): Promise<Tarjetas> {
    return this.tarjetascontpromocionesRepository.tarjeta(id);
  }
}
