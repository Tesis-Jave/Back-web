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
  Cafeteria,
  Tarjetascontpromociones,
} from '../models';
import {CafeteriaRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class CafeteriaTarjetascontpromocionesController {
  constructor(
    @repository(CafeteriaRepository) protected cafeteriaRepository: CafeteriaRepository,
  ) { }

  @get('/cafeterias/{id}/tarjetascontpromociones', {
    responses: {
      '200': {
        description: 'Array of Cafeteria has many Tarjetascontpromociones',
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
    return this.cafeteriaRepository.tarjetascontpromociones(id).find(filter);
  }

  @post('/cafeterias/{id}/tarjetascontpromociones', {
    responses: {
      '200': {
        description: 'Cafeteria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarjetascontpromociones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cafeteria.prototype.id_cafeteria,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetascontpromociones, {
            title: 'NewTarjetascontpromocionesInCafeteria',
            exclude: ['id_transaccion'],
            optional: ['id_cafeteria']
          }),
        },
      },
    }) tarjetascontpromociones: Omit<Tarjetascontpromociones, 'id_transaccion'>,
  ): Promise<Tarjetascontpromociones> {
    return this.cafeteriaRepository.tarjetascontpromociones(id).create(tarjetascontpromociones);
  }

  @patch('/cafeterias/{id}/tarjetascontpromociones', {
    responses: {
      '200': {
        description: 'Cafeteria.Tarjetascontpromociones PATCH success count',
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
    return this.cafeteriaRepository.tarjetascontpromociones(id).patch(tarjetascontpromociones, where);
  }

  @del('/cafeterias/{id}/tarjetascontpromociones', {
    responses: {
      '200': {
        description: 'Cafeteria.Tarjetascontpromociones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tarjetascontpromociones)) where?: Where<Tarjetascontpromociones>,
  ): Promise<Count> {
    return this.cafeteriaRepository.tarjetascontpromociones(id).delete(where);
  }
}
