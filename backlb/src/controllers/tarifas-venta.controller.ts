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
import {TarifasVenta} from '../models';
import {TarifasVentaRepository} from '../repositories';

export class TarifasVentaController {
  constructor(
    @repository(TarifasVentaRepository)
    public tarifasVentaRepository : TarifasVentaRepository,
  ) {}

  @post('/tarifas-ventas')
  @response(200, {
    description: 'TarifasVenta model instance',
    content: {'application/json': {schema: getModelSchemaRef(TarifasVenta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TarifasVenta, {
            title: 'NewTarifasVenta',
            
          }),
        },
      },
    })
    tarifasVenta: TarifasVenta,
  ): Promise<TarifasVenta> {
    return this.tarifasVentaRepository.create(tarifasVenta);
  }

  @get('/tarifas-ventas/count')
  @response(200, {
    description: 'TarifasVenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TarifasVenta) where?: Where<TarifasVenta>,
  ): Promise<Count> {
    return this.tarifasVentaRepository.count(where);
  }

  @get('/tarifas-ventas')
  @response(200, {
    description: 'Array of TarifasVenta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TarifasVenta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TarifasVenta) filter?: Filter<TarifasVenta>,
  ): Promise<TarifasVenta[]> {
    return this.tarifasVentaRepository.find(filter);
  }

  @patch('/tarifas-ventas')
  @response(200, {
    description: 'TarifasVenta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TarifasVenta, {partial: true}),
        },
      },
    })
    tarifasVenta: TarifasVenta,
    @param.where(TarifasVenta) where?: Where<TarifasVenta>,
  ): Promise<Count> {
    return this.tarifasVentaRepository.updateAll(tarifasVenta, where);
  }

  @get('/tarifas-ventas/{id}')
  @response(200, {
    description: 'TarifasVenta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TarifasVenta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TarifasVenta, {exclude: 'where'}) filter?: FilterExcludingWhere<TarifasVenta>
  ): Promise<TarifasVenta> {
    return this.tarifasVentaRepository.findById(id, filter);
  }

  @patch('/tarifas-ventas/{id}')
  @response(204, {
    description: 'TarifasVenta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TarifasVenta, {partial: true}),
        },
      },
    })
    tarifasVenta: TarifasVenta,
  ): Promise<void> {
    await this.tarifasVentaRepository.updateById(id, tarifasVenta);
  }

  @put('/tarifas-ventas/{id}')
  @response(204, {
    description: 'TarifasVenta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tarifasVenta: TarifasVenta,
  ): Promise<void> {
    await this.tarifasVentaRepository.replaceById(id, tarifasVenta);
  }

  @del('/tarifas-ventas/{id}')
  @response(204, {
    description: 'TarifasVenta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tarifasVentaRepository.deleteById(id);
  }
}
