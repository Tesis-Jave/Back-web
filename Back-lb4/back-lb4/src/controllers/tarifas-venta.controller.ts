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
import {Tarifasventa} from '../models';
import {TarifasventaRepository} from '../repositories';

export class TarifasVentaController {
  constructor(
    @repository(TarifasventaRepository)
    public tarifasventaRepository : TarifasventaRepository,
  ) {}

  @post('/tarifasventas')
  @response(200, {
    description: 'Tarifasventa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tarifasventa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarifasventa, {
            title: 'NewTarifasventa',
            exclude: ['id_tarifa'],
          }),
        },
      },
    })
    tarifasventa: Omit<Tarifasventa, 'id_tarifa'>,
  ): Promise<Tarifasventa> {
    return this.tarifasventaRepository.create(tarifasventa);
  }

  @get('/tarifasventas/count')
  @response(200, {
    description: 'Tarifasventa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tarifasventa) where?: Where<Tarifasventa>,
  ): Promise<Count> {
    return this.tarifasventaRepository.count(where);
  }

  @get('/tarifasventas')
  @response(200, {
    description: 'Array of Tarifasventa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tarifasventa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tarifasventa) filter?: Filter<Tarifasventa>,
  ): Promise<Tarifasventa[]> {
    return this.tarifasventaRepository.find(filter);
  }

  @patch('/tarifasventas')
  @response(200, {
    description: 'Tarifasventa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarifasventa, {partial: true}),
        },
      },
    })
    tarifasventa: Tarifasventa,
    @param.where(Tarifasventa) where?: Where<Tarifasventa>,
  ): Promise<Count> {
    return this.tarifasventaRepository.updateAll(tarifasventa, where);
  }

  @get('/tarifasventas/{id}')
  @response(200, {
    description: 'Tarifasventa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tarifasventa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tarifasventa, {exclude: 'where'}) filter?: FilterExcludingWhere<Tarifasventa>
  ): Promise<Tarifasventa> {
    return this.tarifasventaRepository.findById(id, filter);
  }

  @patch('/tarifasventas/{id}')
  @response(204, {
    description: 'Tarifasventa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarifasventa, {partial: true}),
        },
      },
    })
    tarifasventa: Tarifasventa,
  ): Promise<void> {
    await this.tarifasventaRepository.updateById(id, tarifasventa);
  }

  @put('/tarifasventas/{id}')
  @response(204, {
    description: 'Tarifasventa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tarifasventa: Tarifasventa,
  ): Promise<void> {
    await this.tarifasventaRepository.replaceById(id, tarifasventa);
  }

  @del('/tarifasventas/{id}')
  @response(204, {
    description: 'Tarifasventa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tarifasventaRepository.deleteById(id);
  }
}
