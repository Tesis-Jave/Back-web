import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cafeteria,
  Tarifasventa,
} from '../models';
import {CafeteriaRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class CafeteriaTarifasventaController {
  constructor(
    @repository(CafeteriaRepository)
    public cafeteriaRepository: CafeteriaRepository,
  ) { }

  @get('/cafeterias/{id}/tarifasventa', {
    responses: {
      '200': {
        description: 'Tarifasventa belonging to Cafeteria',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tarifasventa),
          },
        },
      },
    },
  })
  async getTarifasventa(
    @param.path.number('id') id: typeof Cafeteria.prototype.id_cafeteria,
  ): Promise<Tarifasventa> {
    return this.cafeteriaRepository.tarifa(id);
  }
}
