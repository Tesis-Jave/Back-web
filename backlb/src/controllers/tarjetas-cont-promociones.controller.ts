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
import {TarjetasContPromociones} from '../models';
import {TarjetasContPromocionesRepository} from '../repositories';

export class TarjetasContPromocionesController {
  constructor(
    @repository(TarjetasContPromocionesRepository)
    public tarjetasContPromocionesRepository : TarjetasContPromocionesRepository,
  ) {}

  @post('/tarjetas-cont-promociones')
  @response(200, {
    description: 'TarjetasContPromociones model instance',
    content: {'application/json': {schema: getModelSchemaRef(TarjetasContPromociones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TarjetasContPromociones, {
            title: 'NewTarjetasContPromociones',
            
          }),
        },
      },
    })
    tarjetasContPromociones: TarjetasContPromociones,
  ): Promise<TarjetasContPromociones> {
    return this.tarjetasContPromocionesRepository.create(tarjetasContPromociones);
  }

  @get('/tarjetas-cont-promociones/count')
  @response(200, {
    description: 'TarjetasContPromociones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TarjetasContPromociones) where?: Where<TarjetasContPromociones>,
  ): Promise<Count> {
    return this.tarjetasContPromocionesRepository.count(where);
  }

  @get('/tarjetas-cont-promociones')
  @response(200, {
    description: 'Array of TarjetasContPromociones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TarjetasContPromociones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TarjetasContPromociones) filter?: Filter<TarjetasContPromociones>,
  ): Promise<TarjetasContPromociones[]> {
    return this.tarjetasContPromocionesRepository.find(filter);
  }

  @patch('/tarjetas-cont-promociones')
  @response(200, {
    description: 'TarjetasContPromociones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TarjetasContPromociones, {partial: true}),
        },
      },
    })
    tarjetasContPromociones: TarjetasContPromociones,
    @param.where(TarjetasContPromociones) where?: Where<TarjetasContPromociones>,
  ): Promise<Count> {
    return this.tarjetasContPromocionesRepository.updateAll(tarjetasContPromociones, where);
  }

  @get('/tarjetas-cont-promociones/{id}')
  @response(200, {
    description: 'TarjetasContPromociones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TarjetasContPromociones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TarjetasContPromociones, {exclude: 'where'}) filter?: FilterExcludingWhere<TarjetasContPromociones>
  ): Promise<TarjetasContPromociones> {
    return this.tarjetasContPromocionesRepository.findById(id, filter);
  }

  @patch('/tarjetas-cont-promociones/{id}')
  @response(204, {
    description: 'TarjetasContPromociones PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TarjetasContPromociones, {partial: true}),
        },
      },
    })
    tarjetasContPromociones: TarjetasContPromociones,
  ): Promise<void> {
    await this.tarjetasContPromocionesRepository.updateById(id, tarjetasContPromociones);
  }

  @put('/tarjetas-cont-promociones/{id}')
  @response(204, {
    description: 'TarjetasContPromociones PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tarjetasContPromociones: TarjetasContPromociones,
  ): Promise<void> {
    await this.tarjetasContPromocionesRepository.replaceById(id, tarjetasContPromociones);
  }

  @del('/tarjetas-cont-promociones/{id}')
  @response(204, {
    description: 'TarjetasContPromociones DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tarjetasContPromocionesRepository.deleteById(id);
  }
}
