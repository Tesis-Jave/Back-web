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
Articulopromocion,
Promociones,
} from '../models';
import {ArticulopromocionRepository, ArticulosRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {prototype} from 'events';

@authenticate('jwt')
export class ArticulosPromocionesController {
  constructor(
    @repository(ArticulosRepository) protected articulosRepository: ArticulosRepository,
    @repository(ArticulopromocionRepository) protected articulosPromocionRepository: ArticulopromocionRepository
  ) { }

  @get('/articulos/{id}/promociones', {
    responses: {
      '200': {
        description: 'Array of Articulos has many Promociones through Articulopromocion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Promociones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Promociones>,
  ): Promise<Promociones[]> {
    return this.articulosRepository.promociones(id).find(filter);
  }

  @post('/articulos/{id}/promociones', {
    responses: {
      '200': {
        description: 'create a Promociones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Promociones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Articulos.prototype.id_articulo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promociones, {
            title: 'NewPromocionesInArticulos',
            exclude: ['id_promocion'],
          }),
        },
      },
    }) promociones: Omit<Promociones, 'id_promocion'>,
  ): Promise<Promociones> {
    return this.articulosRepository.promociones(id).create(promociones);
  }

  @patch('/articulos/{id}/promociones', {
    responses: {
      '200': {
        description: 'Articulos.Promociones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promociones, {partial: true}),
        },
      },
    })
    promociones: Partial<Promociones>,
    @param.query.object('where', getWhereSchemaFor(Promociones)) where?: Where<Promociones>,
  ): Promise<Count> {
    return this.articulosRepository.promociones(id).patch(promociones, where);
  }

  @del('/articulos/{id}/promociones', {
    responses: {
      '200': {
        description: 'Articulos.Promociones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Promociones)) where?: Where<Promociones>,
  ): Promise<Count> {
    return this.articulosRepository.promociones(id).delete(where);
  }

// busca articulos de una promo
  @get('/promociones/{id}/articulos', {
    responses: {
      '200': {
        description: 'Array of Articulo instances associated with the specified Promocion',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Articulos, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async findArticulosByPromocion(@param.path.number('id') id: number): Promise<Articulos[]> {
    // Buscar los ids de los artículos asociados a la promoción
    const articuloPromociones: Articulopromocion[] = await this.articulosPromocionRepository.find({
      where: { id_promocion: id },
    });

    // Extraer los ids de los artículos asociados a la promoción
    const articuloIds: number[] = articuloPromociones
      .map(ap => ap.id_articulo)
      .filter(id => id !== undefined) as number[];

    // Buscar los artículos utilizando los ids obtenidos
    const articulos: Articulos[] = await this.articulosRepository.find({
      where: { id_articulo: { inq: articuloIds } },
    });

    return articulos;

  }

}

