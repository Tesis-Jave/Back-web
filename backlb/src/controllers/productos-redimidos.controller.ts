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
import {ProductosRedimidos} from '../models';
import {ProductosRedimidosRepository} from '../repositories';

export class ProductosRedimidosController {
  constructor(
    @repository(ProductosRedimidosRepository)
    public productosRedimidosRepository : ProductosRedimidosRepository,
  ) {}

  @post('/productos-redimidos')
  @response(200, {
    description: 'ProductosRedimidos model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductosRedimidos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosRedimidos, {
            title: 'NewProductosRedimidos',
            
          }),
        },
      },
    })
    productosRedimidos: ProductosRedimidos,
  ): Promise<ProductosRedimidos> {
    return this.productosRedimidosRepository.create(productosRedimidos);
  }

  @get('/productos-redimidos/count')
  @response(200, {
    description: 'ProductosRedimidos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductosRedimidos) where?: Where<ProductosRedimidos>,
  ): Promise<Count> {
    return this.productosRedimidosRepository.count(where);
  }

  @get('/productos-redimidos')
  @response(200, {
    description: 'Array of ProductosRedimidos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductosRedimidos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductosRedimidos) filter?: Filter<ProductosRedimidos>,
  ): Promise<ProductosRedimidos[]> {
    return this.productosRedimidosRepository.find(filter);
  }

  @patch('/productos-redimidos')
  @response(200, {
    description: 'ProductosRedimidos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosRedimidos, {partial: true}),
        },
      },
    })
    productosRedimidos: ProductosRedimidos,
    @param.where(ProductosRedimidos) where?: Where<ProductosRedimidos>,
  ): Promise<Count> {
    return this.productosRedimidosRepository.updateAll(productosRedimidos, where);
  }

  @get('/productos-redimidos/{id}')
  @response(200, {
    description: 'ProductosRedimidos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductosRedimidos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProductosRedimidos, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductosRedimidos>
  ): Promise<ProductosRedimidos> {
    return this.productosRedimidosRepository.findById(id, filter);
  }

  @patch('/productos-redimidos/{id}')
  @response(204, {
    description: 'ProductosRedimidos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosRedimidos, {partial: true}),
        },
      },
    })
    productosRedimidos: ProductosRedimidos,
  ): Promise<void> {
    await this.productosRedimidosRepository.updateById(id, productosRedimidos);
  }

  @put('/productos-redimidos/{id}')
  @response(204, {
    description: 'ProductosRedimidos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productosRedimidos: ProductosRedimidos,
  ): Promise<void> {
    await this.productosRedimidosRepository.replaceById(id, productosRedimidos);
  }

  @del('/productos-redimidos/{id}')
  @response(204, {
    description: 'ProductosRedimidos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productosRedimidosRepository.deleteById(id);
  }
}
