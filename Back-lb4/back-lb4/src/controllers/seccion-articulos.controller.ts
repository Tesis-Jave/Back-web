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
  Seccion,
  Articulos,
} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionArticulosController {
  constructor(
    @repository(SeccionRepository) protected seccionRepository: SeccionRepository,
  ) { }

  @get('/seccions/{id}/articulos', {
    responses: {
      '200': {
        description: 'Array of Seccion has many Articulos',
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
    return this.seccionRepository.articulos(id).find(filter);
  }

  @post('/seccions/{id}/articulos', {
    responses: {
      '200': {
        description: 'Seccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Articulos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Seccion.prototype.id_seccion,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulos, {
            title: 'NewArticulosInSeccion',
            exclude: ['id_articulo'],
            optional: ['id_seccion']
          }),
        },
      },
    }) articulos: Omit<Articulos, 'id_articulo'>,
  ): Promise<Articulos> {
    return this.seccionRepository.articulos(id).create(articulos);
  }

  @patch('/seccions/{id}/articulos', {
    responses: {
      '200': {
        description: 'Seccion.Articulos PATCH success count',
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
    return this.seccionRepository.articulos(id).patch(articulos, where);
  }

  @del('/seccions/{id}/articulos', {
    responses: {
      '200': {
        description: 'Seccion.Articulos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Articulos)) where?: Where<Articulos>,
  ): Promise<Count> {
    return this.seccionRepository.articulos(id).delete(where);
  }
}
