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
Tarjetascontpromociones,
Productosredimidos,
Articulos,
} from '../models';
import {TarjetascontpromocionesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class TarjetascontpromocionesArticulosController {
  constructor(
    @repository(TarjetascontpromocionesRepository) protected tarjetascontpromocionesRepository: TarjetascontpromocionesRepository,
  ) { }

  @get('/tarjetascontpromociones/{id}/articulos', {
    responses: {
      '200': {
        description: 'Array of Tarjetascontpromociones has many Articulos through Productosredimidos',
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
    return this.tarjetascontpromocionesRepository.articulosredimidos(id).find(filter);
  }

  @post('/tarjetascontpromociones/{id}/articulos', {
    responses: {
      '200': {
        description: 'create a Articulos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Articulos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tarjetascontpromociones.prototype.id_transaccion,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulos, {
            title: 'NewArticulosInTarjetascontpromociones',
            exclude: ['id_articulo'],
          }),
        },
      },
    }) articulos: Omit<Articulos, 'id_articulo'>,
  ): Promise<Articulos> {
    return this.tarjetascontpromocionesRepository.articulosredimidos(id).create(articulos);
  }

  @patch('/tarjetascontpromociones/{id}/articulos', {
    responses: {
      '200': {
        description: 'Tarjetascontpromociones.Articulos PATCH success count',
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
    return this.tarjetascontpromocionesRepository.articulosredimidos(id).patch(articulos, where);
  }

  @del('/tarjetascontpromociones/{id}/articulos', {
    responses: {
      '200': {
        description: 'Tarjetascontpromociones.Articulos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Articulos)) where?: Where<Articulos>,
  ): Promise<Count> {
    return this.tarjetascontpromocionesRepository.articulosredimidos(id).delete(where);
  }
}
