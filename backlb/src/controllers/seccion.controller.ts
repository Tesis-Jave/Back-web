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
import {Seccion} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionController {
  constructor(
    @repository(SeccionRepository)
    public seccionRepository : SeccionRepository,
  ) {}

  @post('/seccions')
  @response(200, {
    description: 'Seccion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Seccion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {
            title: 'NewSeccion',
            
          }),
        },
      },
    })
    seccion: Seccion,
  ): Promise<Seccion> {
    return this.seccionRepository.create(seccion);
  }

  @get('/seccions/count')
  @response(200, {
    description: 'Seccion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Seccion) where?: Where<Seccion>,
  ): Promise<Count> {
    return this.seccionRepository.count(where);
  }

  @get('/seccions')
  @response(200, {
    description: 'Array of Seccion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Seccion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Seccion) filter?: Filter<Seccion>,
  ): Promise<Seccion[]> {
    return this.seccionRepository.find(filter);
  }

  @patch('/seccions')
  @response(200, {
    description: 'Seccion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {partial: true}),
        },
      },
    })
    seccion: Seccion,
    @param.where(Seccion) where?: Where<Seccion>,
  ): Promise<Count> {
    return this.seccionRepository.updateAll(seccion, where);
  }

  @get('/seccions/{id}')
  @response(200, {
    description: 'Seccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Seccion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Seccion, {exclude: 'where'}) filter?: FilterExcludingWhere<Seccion>
  ): Promise<Seccion> {
    return this.seccionRepository.findById(id, filter);
  }

  @patch('/seccions/{id}')
  @response(204, {
    description: 'Seccion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {partial: true}),
        },
      },
    })
    seccion: Seccion,
  ): Promise<void> {
    await this.seccionRepository.updateById(id, seccion);
  }

  @put('/seccions/{id}')
  @response(204, {
    description: 'Seccion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() seccion: Seccion,
  ): Promise<void> {
    await this.seccionRepository.replaceById(id, seccion);
  }

  @del('/seccions/{id}')
  @response(204, {
    description: 'Seccion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.seccionRepository.deleteById(id);
  }
}
