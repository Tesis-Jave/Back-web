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
  Clientes,
  Tarjetas,
} from '../models';
import {ClientesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class ClientesTarjetasController {
  constructor(
    @repository(ClientesRepository) protected clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/tarjetas', {
    responses: {
      '200': {
        description: 'Array of Clientes has many Tarjetas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tarjetas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tarjetas>,
  ): Promise<Tarjetas[]> {
    return this.clientesRepository.tarjetas(id).find(filter);
  }

  @post('/clientes/{id}/tarjetas', {
    responses: {
      '200': {
        description: 'Clientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarjetas)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Clientes.prototype.id_cliente,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetas, {
            title: 'NewTarjetasInClientes',
            exclude: ['id_tarjeta'],
            optional: ['is_cliente']
          }),
        },
      },
    }) tarjetas: Omit<Tarjetas, 'id_tarjeta'>,
  ): Promise<Tarjetas> {
    return this.clientesRepository.tarjetas(id).create(tarjetas);
  }

  @patch('/clientes/{id}/tarjetas', {
    responses: {
      '200': {
        description: 'Clientes.Tarjetas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetas, {partial: true}),
        },
      },
    })
    tarjetas: Partial<Tarjetas>,
    @param.query.object('where', getWhereSchemaFor(Tarjetas)) where?: Where<Tarjetas>,
  ): Promise<Count> {
    return this.clientesRepository.tarjetas(id).patch(tarjetas, where);
  }

  @del('/clientes/{id}/tarjetas', {
    responses: {
      '200': {
        description: 'Clientes.Tarjetas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tarjetas)) where?: Where<Tarjetas>,
  ): Promise<Count> {
    return this.clientesRepository.tarjetas(id).delete(where);
  }
}
