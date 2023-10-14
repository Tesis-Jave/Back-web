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
  Articulos,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoArticulosController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/articulos', {
    responses: {
      '200': {
        description: 'Array of Departamento has many Articulos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Articulos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Articulos>,
  ): Promise<Articulos[]> {
    return this.departamentoRepository.articulos(id).find(filter);
  }

  @post('/departamentos/{id}/articulos', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Articulos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Departamento.prototype.id_dpto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulos, {
            title: 'NewArticulosInDepartamento',
            exclude: ['id_articulo'],
            optional: ['id_dpto']
          }),
        },
      },
    }) articulos: Omit<Articulos, 'id_articulo'>,
  ): Promise<Articulos> {
    return this.departamentoRepository.articulos(id).create(articulos);
  }

  @patch('/departamentos/{id}/articulos', {
    responses: {
      '200': {
        description: 'Departamento.Articulos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulos, {partial: true}),
        },
      },
    })
    articulos: Partial<Articulos>,
    @param.query.object('where', getWhereSchemaFor(Articulos)) where?: Where<Articulos>,
  ): Promise<Count> {
    return this.departamentoRepository.articulos(id).patch(articulos, where);
  }

  @del('/departamentos/{id}/articulos', {
    responses: {
      '200': {
        description: 'Departamento.Articulos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Articulos)) where?: Where<Articulos>,
  ): Promise<Count> {
    return this.departamentoRepository.articulos(id).delete(where);
  }
}
