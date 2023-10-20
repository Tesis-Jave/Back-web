import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tarifasventa,
  Cafeteria,
} from '../models';
import {TarifasventaRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class TarifasventaCafeteriaController {
  constructor(
    @repository(TarifasventaRepository) protected tarifasventaRepository: TarifasventaRepository,
  ) { }

  @get('/tarifasventas/{id}/cafeterias', {
    responses: {
      '200': {
        description: 'Array of Tarifasventa has many Cafeteria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cafeteria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cafeteria>,
  ): Promise<Cafeteria[]> {
    return this.tarifasventaRepository.cafeterias(id).find(filter);
  }

  @post('/tarifasventas/{id}/cafeterias', {
    responses: {
      '200': {
        description: 'Tarifasventa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cafeteria)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tarifasventa.prototype.id_tarifa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cafeteria, {
            title: 'NewCafeteriaInTarifasventa',
            exclude: ['id_cafeteria'],
            optional: ['id_tarifa']
          }),
        },
      },
    }) cafeteria: Omit<Cafeteria, 'id_cafeteria'>,
  ): Promise<Cafeteria> {
    return this.tarifasventaRepository.cafeterias(id).create(cafeteria);
  }

  @patch('/tarifasventas/{id}/cafeterias', {
    responses: {
      '200': {
        description: 'Tarifasventa.Cafeteria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cafeteria, {partial: true}),
        },
      },
    })
    cafeteria: Partial<Cafeteria>,
    @param.query.object('where', getWhereSchemaFor(Cafeteria)) where?: Where<Cafeteria>,
  ): Promise<Count> {
    return this.tarifasventaRepository.cafeterias(id).patch(cafeteria, where);
  }

  @del('/tarifasventas/{id}/cafeterias', {
    responses: {
      '200': {
        description: 'Tarifasventa.Cafeteria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cafeteria)) where?: Where<Cafeteria>,
  ): Promise<Count> {
    return this.tarifasventaRepository.cafeterias(id).delete(where);
  }
}
