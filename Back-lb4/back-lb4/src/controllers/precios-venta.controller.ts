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
import {Preciosventa} from '../models';
import {PreciosventaRepository} from '../repositories';

export class PreciosVentaController {
  constructor(
    @repository(PreciosventaRepository)
    public preciosventaRepository : PreciosventaRepository,
  ) {}

  @post('/preciosventas')
  @response(200, {
    description: 'Preciosventa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Preciosventa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preciosventa, {
            title: 'NewPreciosventa',
            
          }),
        },
      },
    })
    preciosventa: Preciosventa,
  ): Promise<Preciosventa> {
    return this.preciosventaRepository.create(preciosventa);
  }

  @get('/preciosventas/count')
  @response(200, {
    description: 'Preciosventa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Preciosventa) where?: Where<Preciosventa>,
  ): Promise<Count> {
    return this.preciosventaRepository.count(where);
  }

  @get('/preciosventas')
  @response(200, {
    description: 'Array of Preciosventa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Preciosventa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Preciosventa) filter?: Filter<Preciosventa>,
  ): Promise<Preciosventa[]> {
    return this.preciosventaRepository.find(filter);
  }

  @patch('/preciosventas')
  @response(200, {
    description: 'Preciosventa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preciosventa, {partial: true}),
        },
      },
    })
    preciosventa: Preciosventa,
    @param.where(Preciosventa) where?: Where<Preciosventa>,
  ): Promise<Count> {
    return this.preciosventaRepository.updateAll(preciosventa, where);
  }

  @get('/preciosventas/{id}')
  @response(200, {
    description: 'Preciosventa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Preciosventa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Preciosventa, {exclude: 'where'}) filter?: FilterExcludingWhere<Preciosventa>
  ): Promise<Preciosventa> {
    return this.preciosventaRepository.findById(id, filter);
  }

  @patch('/preciosventas/{id}')
  @response(204, {
    description: 'Preciosventa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preciosventa, {partial: true}),
        },
      },
    })
    preciosventa: Preciosventa,
  ): Promise<void> {
    await this.preciosventaRepository.updateById(id, preciosventa);
  }

  @put('/preciosventas/{id}')
  @response(204, {
    description: 'Preciosventa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() preciosventa: Preciosventa,
  ): Promise<void> {
    await this.preciosventaRepository.replaceById(id, preciosventa);
  }

  @del('/preciosventas/{id}')
  @response(204, {
    description: 'Preciosventa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.preciosventaRepository.deleteById(id);
  }
}
