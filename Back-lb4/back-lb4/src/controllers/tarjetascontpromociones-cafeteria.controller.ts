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
  Cafeteria,
} from '../models';
import {TarjetascontpromocionesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class TarjetascontpromocionesCafeteriaController {
  constructor(
    @repository(TarjetascontpromocionesRepository)
    public tarjetascontpromocionesRepository: TarjetascontpromocionesRepository,
  ) { }

  @get('/tarjetascontpromociones/{id}/cafeteria', {
    responses: {
      '200': {
        description: 'Cafeteria belonging to Tarjetascontpromociones',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cafeteria),
          },
        },
      },
    },
  })
  async getCafeteria(
    @param.path.number('id') id: typeof Tarjetascontpromociones.prototype.id_transaccion,
  ): Promise<Cafeteria> {
    return this.tarjetascontpromocionesRepository.cafeteria(id);
  }
}
