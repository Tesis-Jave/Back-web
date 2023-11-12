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
Articulos,
Preciosventa,
Tarifasventa,
} from '../models';
import {ArticulosRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class ArticulosTarifasventaController {
  constructor(
    @repository(ArticulosRepository) protected articulosRepository: ArticulosRepository,
  ) { }

  @get('/articulos/{id}/tarifasventas', {
    responses: {
      '200': {
        description: 'Array of Articulos has many Tarifasventa through Preciosventa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tarifasventa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tarifasventa>,
  ): Promise<Tarifasventa[]> {
    return this.articulosRepository.tarifasventas(id).find(filter);
  }

  @post('/articulos/{id}/tarifasventas', {
    responses: {
      '200': {
        description: 'create a Tarifasventa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarifasventa)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Articulos.prototype.id_articulo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarifasventa, {
            title: 'NewTarifasventaInArticulos',
            exclude: ['id_tarifa'],
          }),
        },
      },
    }) tarifasventa: Omit<Tarifasventa, 'id_tarifa'>,
  ): Promise<Tarifasventa> {
    return this.articulosRepository.tarifasventas(id).create(tarifasventa);
  }

  @patch('/articulos/{id}/tarifasventas', {
    responses: {
      '200': {
        description: 'Articulos.Tarifasventa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarifasventa, {partial: true}),
        },
      },
    })
    tarifasventa: Partial<Tarifasventa>,
    @param.query.object('where', getWhereSchemaFor(Tarifasventa)) where?: Where<Tarifasventa>,
  ): Promise<Count> {
    return this.articulosRepository.tarifasventas(id).patch(tarifasventa, where);
  }

  @del('/articulos/{id}/tarifasventas', {
    responses: {
      '200': {
        description: 'Articulos.Tarifasventa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tarifasventa)) where?: Where<Tarifasventa>,
  ): Promise<Count> {
    return this.articulosRepository.tarifasventas(id).delete(where);
  }
}
