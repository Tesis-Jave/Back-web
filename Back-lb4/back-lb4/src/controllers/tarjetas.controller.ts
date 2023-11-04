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
import {Tarjetas} from '../models';
import {TarjetasRepository} from '../repositories';

export class TarjetasController {
  constructor(
    @repository(TarjetasRepository)
    public tarjetasRepository : TarjetasRepository,
  ) {}

  @post('/tarjetas')
  @response(200, {
    description: 'Tarjetas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tarjetas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetas, {
            title: 'NewTarjetas',
            exclude: ['id_tarjeta'],
          }),
        },
      },
    })
    tarjetas: Omit<Tarjetas, 'id_tarjeta'>,
  ): Promise<Tarjetas> {
    return this.tarjetasRepository.create(tarjetas);
  }

  @get('/tarjetas/count')
  @response(200, {
    description: 'Tarjetas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tarjetas) where?: Where<Tarjetas>,
  ): Promise<Count> {
    return this.tarjetasRepository.count(where);
  }

  @get('/tarjetas')
  @response(200, {
    description: 'Array of Tarjetas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tarjetas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tarjetas) filter?: Filter<Tarjetas>,
  ): Promise<Tarjetas[]> {
    return this.tarjetasRepository.find(filter);
  }

  @patch('/tarjetas')
  @response(200, {
    description: 'Tarjetas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetas, {partial: true}),
        },
      },
    })
    tarjetas: Tarjetas,
    @param.where(Tarjetas) where?: Where<Tarjetas>,
  ): Promise<Count> {
    return this.tarjetasRepository.updateAll(tarjetas, where);
  }

  @get('/tarjetas/{id}')
  @response(200, {
    description: 'Tarjetas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tarjetas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tarjetas, {exclude: 'where'}) filter?: FilterExcludingWhere<Tarjetas>
  ): Promise<Tarjetas> {
    return this.tarjetasRepository.findById(id, filter);
  }

  @patch('/tarjetas/{id}')
  @response(204, {
    description: 'Tarjetas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetas, {partial: true}),
        },
      },
    })
    tarjetas: Tarjetas,
  ): Promise<void> {
    await this.tarjetasRepository.updateById(id, tarjetas);
  }

  @put('/tarjetas/{id}')
  @response(204, {
    description: 'Tarjetas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tarjetas: Tarjetas,
  ): Promise<void> {
    await this.tarjetasRepository.replaceById(id, tarjetas);
  }

  @del('/tarjetas/{id}')
  @response(204, {
    description: 'Tarjetas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tarjetasRepository.deleteById(id);
  }
}
