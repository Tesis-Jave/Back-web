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
import {Promociones} from '../models';
import {PromocionesRepository} from '../repositories';

export class PromocionesController {
  constructor(
    @repository(PromocionesRepository)
    public promocionesRepository : PromocionesRepository,
  ) {}

  @post('/promociones')
  @response(200, {
    description: 'Promociones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Promociones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promociones, {
            title: 'NewPromociones',
            exclude: ['id_promocion'],
          }),
        },
      },
    })
    promociones: Omit<Promociones, 'id_promocion'>,
  ): Promise<Promociones> {
    return this.promocionesRepository.create(promociones);
  }

  @get('/promociones/count')
  @response(200, {
    description: 'Promociones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Promociones) where?: Where<Promociones>,
  ): Promise<Count> {
    return this.promocionesRepository.count(where);
  }

  @get('/promociones')
  @response(200, {
    description: 'Array of Promociones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Promociones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Promociones) filter?: Filter<Promociones>,
  ): Promise<Promociones[]> {
    return this.promocionesRepository.find(filter);
  }

  @patch('/promociones')
  @response(200, {
    description: 'Promociones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promociones, {partial: true}),
        },
      },
    })
    promociones: Promociones,
    @param.where(Promociones) where?: Where<Promociones>,
  ): Promise<Count> {
    return this.promocionesRepository.updateAll(promociones, where);
  }

  @get('/promociones/{id}')
  @response(200, {
    description: 'Promociones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Promociones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Promociones, {exclude: 'where'}) filter?: FilterExcludingWhere<Promociones>
  ): Promise<Promociones> {
    return this.promocionesRepository.findById(id, filter);
  }

  @patch('/promociones/{id}')
  @response(204, {
    description: 'Promociones PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promociones, {partial: true}),
        },
      },
    })
    promociones: Promociones,
  ): Promise<void> {
    await this.promocionesRepository.updateById(id, promociones);
  }

  @put('/promociones/{id}')
  @response(204, {
    description: 'Promociones PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() promociones: Promociones,
  ): Promise<void> {
    await this.promocionesRepository.replaceById(id, promociones);
  }

  @del('/promociones/{id}')
  @response(204, {
    description: 'Promociones DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.promocionesRepository.deleteById(id);
  }
}
