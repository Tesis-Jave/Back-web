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
import {PreciosVenta} from '../models';
import {PreciosVentaRepository} from '../repositories';

export class PreciosVentaController {
  constructor(
    @repository(PreciosVentaRepository)
    public preciosVentaRepository : PreciosVentaRepository,
  ) {}

  @post('/precios-ventas')
  @response(200, {
    description: 'PreciosVenta model instance',
    content: {'application/json': {schema: getModelSchemaRef(PreciosVenta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PreciosVenta, {
            title: 'NewPreciosVenta',
            
          }),
        },
      },
    })
    preciosVenta: PreciosVenta,
  ): Promise<PreciosVenta> {
    return this.preciosVentaRepository.create(preciosVenta);
  }

  @get('/precios-ventas/count')
  @response(200, {
    description: 'PreciosVenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PreciosVenta) where?: Where<PreciosVenta>,
  ): Promise<Count> {
    return this.preciosVentaRepository.count(where);
  }

  @get('/precios-ventas')
  @response(200, {
    description: 'Array of PreciosVenta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PreciosVenta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PreciosVenta) filter?: Filter<PreciosVenta>,
  ): Promise<PreciosVenta[]> {
    return this.preciosVentaRepository.find(filter);
  }

  @patch('/precios-ventas')
  @response(200, {
    description: 'PreciosVenta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PreciosVenta, {partial: true}),
        },
      },
    })
    preciosVenta: PreciosVenta,
    @param.where(PreciosVenta) where?: Where<PreciosVenta>,
  ): Promise<Count> {
    return this.preciosVentaRepository.updateAll(preciosVenta, where);
  }

  @get('/precios-ventas/{id}')
  @response(200, {
    description: 'PreciosVenta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PreciosVenta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PreciosVenta, {exclude: 'where'}) filter?: FilterExcludingWhere<PreciosVenta>
  ): Promise<PreciosVenta> {
    return this.preciosVentaRepository.findById(id, filter);
  }

  @patch('/precios-ventas/{id}')
  @response(204, {
    description: 'PreciosVenta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PreciosVenta, {partial: true}),
        },
      },
    })
    preciosVenta: PreciosVenta,
  ): Promise<void> {
    await this.preciosVentaRepository.updateById(id, preciosVenta);
  }

  @put('/precios-ventas/{id}')
  @response(204, {
    description: 'PreciosVenta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() preciosVenta: PreciosVenta,
  ): Promise<void> {
    await this.preciosVentaRepository.replaceById(id, preciosVenta);
  }

  @del('/precios-ventas/{id}')
  @response(204, {
    description: 'PreciosVenta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.preciosVentaRepository.deleteById(id);
  }
}
