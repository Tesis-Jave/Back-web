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
import {Articulos} from '../models';
import {ArticulosRepository} from '../repositories';

export class ArticulosController {
  constructor(
    @repository(ArticulosRepository)
    public articulosRepository : ArticulosRepository,
  ) {}

  @post('/articulos')
  @response(200, {
    description: 'Articulos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Articulos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulos, {
            title: 'NewArticulos',
            
          }),
        },
      },
    })
    articulos: Articulos,
  ): Promise<Articulos> {
    return this.articulosRepository.create(articulos);
  }

  @get('/articulos/count')
  @response(200, {
    description: 'Articulos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Articulos) where?: Where<Articulos>,
  ): Promise<Count> {
    return this.articulosRepository.count(where);
  }

  @get('/articulos')
  @response(200, {
    description: 'Array of Articulos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Articulos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Articulos) filter?: Filter<Articulos>,
  ): Promise<Articulos[]> {
    return this.articulosRepository.find(filter);
  }

  @patch('/articulos')
  @response(200, {
    description: 'Articulos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulos, {partial: true}),
        },
      },
    })
    articulos: Articulos,
    @param.where(Articulos) where?: Where<Articulos>,
  ): Promise<Count> {
    return this.articulosRepository.updateAll(articulos, where);
  }

  @get('/articulos/{id}')
  @response(200, {
    description: 'Articulos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Articulos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Articulos, {exclude: 'where'}) filter?: FilterExcludingWhere<Articulos>
  ): Promise<Articulos> {
    return this.articulosRepository.findById(id, filter);
  }

  @patch('/articulos/{id}')
  @response(204, {
    description: 'Articulos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulos, {partial: true}),
        },
      },
    })
    articulos: Articulos,
  ): Promise<void> {
    await this.articulosRepository.updateById(id, articulos);
  }

  @put('/articulos/{id}')
  @response(204, {
    description: 'Articulos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() articulos: Articulos,
  ): Promise<void> {
    await this.articulosRepository.replaceById(id, articulos);
  }

  @del('/articulos/{id}')
  @response(204, {
    description: 'Articulos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.articulosRepository.deleteById(id);
  }
}
