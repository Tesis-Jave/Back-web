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
  Tarjetas,
  Tarjetascontpromociones,
} from '../models';
import {TarjetasRepository} from '../repositories';

export class TarjetasTarjetascontpromocionesController {
  constructor(
    @repository(TarjetasRepository) protected tarjetasRepository: TarjetasRepository,
  ) { }

  @get('/tarjetas/{id}/tarjetascontpromociones', {
    responses: {
      '200': {
        description: 'Array of Tarjetas has many Tarjetascontpromociones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tarjetascontpromociones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tarjetascontpromociones>,
  ): Promise<Tarjetascontpromociones[]> {
    return this.tarjetasRepository.tarjetascontpromociones(id).find(filter);
  }

  @post('/tarjetas/{id}/tarjetascontpromociones', {
    responses: {
      '200': {
        description: 'Tarjetas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarjetascontpromociones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tarjetas.prototype.id_tarjeta,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetascontpromociones, {
            title: 'NewTarjetascontpromocionesInTarjetas',
            exclude: ['id_transaccion'],
            optional: ['id_tarjeta']
          }),
        },
      },
    }) tarjetascontpromociones: Omit<Tarjetascontpromociones, 'id_transaccion'>,
  ): Promise<Tarjetascontpromociones> {
    return this.tarjetasRepository.tarjetascontpromociones(id).create(tarjetascontpromociones);
  }

  @patch('/tarjetas/{id}/tarjetascontpromociones', {
    responses: {
      '200': {
        description: 'Tarjetas.Tarjetascontpromociones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetascontpromociones, {partial: true}),
        },
      },
    })
    tarjetascontpromociones: Partial<Tarjetascontpromociones>,
    @param.query.object('where', getWhereSchemaFor(Tarjetascontpromociones)) where?: Where<Tarjetascontpromociones>,
  ): Promise<Count> {
    return this.tarjetasRepository.tarjetascontpromociones(id).patch(tarjetascontpromociones, where);
  }

  @del('/tarjetas/{id}/tarjetascontpromociones', {
    responses: {
      '200': {
        description: 'Tarjetas.Tarjetascontpromociones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tarjetascontpromociones)) where?: Where<Tarjetascontpromociones>,
  ): Promise<Count> {
    return this.tarjetasRepository.tarjetascontpromociones(id).delete(where);
  }
}
