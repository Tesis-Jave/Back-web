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
import {Perfil} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilController {
  constructor(
    @repository(PerfilRepository)
    public perfilRepository : PerfilRepository,
  ) {}

  @post('/perfils')
  @response(200, {
    description: 'Perfil model instance',
    content: {'application/json': {schema: getModelSchemaRef(Perfil)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {
            title: 'NewPerfil',
            exclude: ['id_perfil'],
          }),
        },
      },
    })
    perfil: Omit<Perfil, 'id_perfil'>,
  ): Promise<Perfil> {
    return this.perfilRepository.create(perfil);
  }

  @get('/perfils/count')
  @response(200, {
    description: 'Perfil model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Perfil) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.perfilRepository.count(where);
  }

  @get('/perfils')
  @response(200, {
    description: 'Array of Perfil model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Perfil, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Perfil) filter?: Filter<Perfil>,
  ): Promise<Perfil[]> {
    return this.perfilRepository.find(filter);
  }

  @patch('/perfils')
  @response(200, {
    description: 'Perfil PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {partial: true}),
        },
      },
    })
    perfil: Perfil,
    @param.where(Perfil) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.perfilRepository.updateAll(perfil, where);
  }

  @get('/perfils/{id}')
  @response(200, {
    description: 'Perfil model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Perfil, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Perfil, {exclude: 'where'}) filter?: FilterExcludingWhere<Perfil>
  ): Promise<Perfil> {
    return this.perfilRepository.findById(id, filter);
  }

  @patch('/perfils/{id}')
  @response(204, {
    description: 'Perfil PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {partial: true}),
        },
      },
    })
    perfil: Perfil,
  ): Promise<void> {
    await this.perfilRepository.updateById(id, perfil);
  }

  @put('/perfils/{id}')
  @response(204, {
    description: 'Perfil PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() perfil: Perfil,
  ): Promise<void> {
    await this.perfilRepository.replaceById(id, perfil);
  }

  @del('/perfils/{id}')
  @response(204, {
    description: 'Perfil DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.perfilRepository.deleteById(id);
  }
}
