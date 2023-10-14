import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Departamento,
  Seccion,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoSeccionController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/seccions', {
    responses: {
      '200': {
        description: 'Array of Departamento has many Seccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Seccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Seccion>,
  ): Promise<Seccion[]> {
    return this.departamentoRepository.secciones(id).find(filter);
  }

  @post('/departamentos/{id}/seccions', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Seccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Departamento.prototype.id_dpto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {
            title: 'NewSeccionInDepartamento',
            exclude: ['id_seccion'],
            optional: ['id_dpto']
          }),
        },
      },
    }) seccion: Omit<Seccion, 'id_seccion'>,
  ): Promise<Seccion> {
    return this.departamentoRepository.secciones(id).create(seccion);
  }

  @patch('/departamentos/{id}/seccions', {
    responses: {
      '200': {
        description: 'Departamento.Seccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {partial: true}),
        },
      },
    })
    seccion: Partial<Seccion>,
    @param.query.object('where', getWhereSchemaFor(Seccion)) where?: Where<Seccion>,
  ): Promise<Count> {
    return this.departamentoRepository.secciones(id).patch(seccion, where);
  }

  @del('/departamentos/{id}/seccions', {
    responses: {
      '200': {
        description: 'Departamento.Seccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Seccion)) where?: Where<Seccion>,
  ): Promise<Count> {
    return this.departamentoRepository.secciones(id).delete(where);
  }
}
