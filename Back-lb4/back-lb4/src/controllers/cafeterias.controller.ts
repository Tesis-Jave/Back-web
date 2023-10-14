import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cafeteria} from '../models';
import {CafeteriaRepository} from '../repositories';

export class CafeteriasController {
  constructor(
    @repository(CafeteriaRepository)
    public cafeteriaRepository : CafeteriaRepository,
  ) {}

  @post('/cafeterias')
  @response(200, {
    description: 'Cafeteria model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cafeteria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cafeteria, {
            title: 'NewCafeteria',
            exclude: ['id_cafeteria'],
          }),
        },
      },
    })
    cafeteria: Omit<Cafeteria, 'id_cafeteria'>,
  ): Promise<Cafeteria> {
    return this.cafeteriaRepository.create(cafeteria);
  }

  @get('/cafeterias/count')
  @response(200, {
    description: 'Cafeteria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cafeteria) where?: Where<Cafeteria>,
  ): Promise<Count> {
    return this.cafeteriaRepository.count(where);
  }

  @get('/cafeterias')
  @response(200, {
    description: 'Array of Cafeteria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cafeteria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cafeteria) filter?: Filter<Cafeteria>,
  ): Promise<Cafeteria[]> {
    return this.cafeteriaRepository.find(filter);
  }

  @patch('/cafeterias')
  @response(200, {
    description: 'Cafeteria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cafeteria, {partial: true}),
        },
      },
    })
    cafeteria: Cafeteria,
    @param.where(Cafeteria) where?: Where<Cafeteria>,
  ): Promise<Count> {
    return this.cafeteriaRepository.updateAll(cafeteria, where);
  }

  @get('/cafeterias/{id}')
  @response(200, {
    description: 'Cafeteria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cafeteria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cafeteria, {exclude: 'where'}) filter?: FilterExcludingWhere<Cafeteria>
  ): Promise<Cafeteria> {
    return this.cafeteriaRepository.findById(id, filter);
  }

  @patch('/cafeterias/{id}')
  @response(204, {
    description: 'Cafeteria PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cafeteria, {partial: true}),
        },
      },
    })
    cafeteria: Cafeteria,
  ): Promise<void> {
    await this.cafeteriaRepository.updateById(id, cafeteria);
  }

  @put('/cafeterias/{id}')
  @response(204, {
    description: 'Cafeteria PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cafeteria: Cafeteria,
  ): Promise<void> {
    await this.cafeteriaRepository.replaceById(id, cafeteria);
  }

  @del('/cafeterias/{id}')
  @response(204, {
    description: 'Cafeteria DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cafeteriaRepository.deleteById(id);
  }
}
