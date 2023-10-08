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
import {ArticulosPromocion} from '../models';
import {ArticulosPromocionRepository} from '../repositories';

export class ArticulosPromocionController {
  constructor(
    @repository(ArticulosPromocionRepository)
    public articulosPromocionRepository : ArticulosPromocionRepository,
  ) {}

  @post('/articulos-promocions')
  @response(200, {
    description: 'ArticulosPromocion model instance',
    content: {'application/json': {schema: getModelSchemaRef(ArticulosPromocion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArticulosPromocion, {
            title: 'NewArticulosPromocion',
            
          }),
        },
      },
    })
    articulosPromocion: ArticulosPromocion,
  ): Promise<ArticulosPromocion> {
    return this.articulosPromocionRepository.create(articulosPromocion);
  }

  @get('/articulos-promocions/count')
  @response(200, {
    description: 'ArticulosPromocion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ArticulosPromocion) where?: Where<ArticulosPromocion>,
  ): Promise<Count> {
    return this.articulosPromocionRepository.count(where);
  }

  @get('/articulos-promocions')
  @response(200, {
    description: 'Array of ArticulosPromocion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ArticulosPromocion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ArticulosPromocion) filter?: Filter<ArticulosPromocion>,
  ): Promise<ArticulosPromocion[]> {
    return this.articulosPromocionRepository.find(filter);
  }

  @patch('/articulos-promocions')
  @response(200, {
    description: 'ArticulosPromocion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArticulosPromocion, {partial: true}),
        },
      },
    })
    articulosPromocion: ArticulosPromocion,
    @param.where(ArticulosPromocion) where?: Where<ArticulosPromocion>,
  ): Promise<Count> {
    return this.articulosPromocionRepository.updateAll(articulosPromocion, where);
  }

  @get('/articulos-promocions/{id}')
  @response(200, {
    description: 'ArticulosPromocion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ArticulosPromocion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ArticulosPromocion, {exclude: 'where'}) filter?: FilterExcludingWhere<ArticulosPromocion>
  ): Promise<ArticulosPromocion> {
    return this.articulosPromocionRepository.findById(id, filter);
  }

  @patch('/articulos-promocions/{id}')
  @response(204, {
    description: 'ArticulosPromocion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArticulosPromocion, {partial: true}),
        },
      },
    })
    articulosPromocion: ArticulosPromocion,
  ): Promise<void> {
    await this.articulosPromocionRepository.updateById(id, articulosPromocion);
  }

  @put('/articulos-promocions/{id}')
  @response(204, {
    description: 'ArticulosPromocion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() articulosPromocion: ArticulosPromocion,
  ): Promise<void> {
    await this.articulosPromocionRepository.replaceById(id, articulosPromocion);
  }

  @del('/articulos-promocions/{id}')
  @response(204, {
    description: 'ArticulosPromocion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.articulosPromocionRepository.deleteById(id);
  }
}
