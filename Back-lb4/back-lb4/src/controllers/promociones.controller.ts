import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Promociones} from '../models';
import {
  ArticulopromocionRepository,
  PromocionesRepository,
} from '../repositories';

@authenticate('jwt')
export class PromocionesController {
  constructor(
    @repository(PromocionesRepository)
    public promocionesRepository: PromocionesRepository,
    @repository(ArticulopromocionRepository)
    public articuloPromocionRepository: ArticulopromocionRepository,
  ) {}

  // crear promocion con sus articulos relacionados
  @post('/promocionesA')
  @response(200, {
    description: 'Promociones model instance',
    content: {'application/json': {schema: Promociones}},
  })
  async createPromocionA(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              descripcion: {type: 'string'},
              fechainicio: {type: 'string'},
              fechafin: {type: 'string'},
              articulosIds: {type: 'array', items: {type: 'number'}},
            },
            required: [
              'descripcion',
              'fechainicio',
              'fechafin',
              'articulosIds',
            ],
          },
        },
      },
    })
    requestBody: {
      descripcion: string;
      fechainicio: string;
      fechafin: string;
      articulosIds: number[];
    },
  ): Promise<Promociones> {
    // Extraer las propiedades del cuerpo de la solicitud
    const {descripcion, fechainicio, fechafin, articulosIds} = requestBody;

    // Crear la promoción en la base de datos
    const nuevaPromocion = await this.promocionesRepository.create({
      descripcion,
      fechainicio,
      fechafin,
    });

    // Relacionar la promoción con los artículos en la tabla articulopromocion
    for (const articuloId of articulosIds) {
      await this.articuloPromocionRepository.create({
        id_articulo: articuloId,
        id_promocion: nuevaPromocion.id_promocion,
      });
    }

    return nuevaPromocion;
  }
  // hacer update a promocion con articulos relacionados

  @patch('/promocionesA/{id}')
  @response(204, {
    description: 'Promociones PATCH success',
  })
  async updatePromocionA(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              descripcion: {type: 'string'},
              fechainicio: {type: 'string'},
              fechafin: {type: 'string'},
              articulosIds: {type: 'array', items: {type: 'number'}},
            },
            required: [
              'descripcion',
              'fechainicio',
              'fechafin',
              'articulosIds',
            ],
          },
        },
      },
    })
    requestBody: {
      descripcion: string;
      fechainicio: string;
      fechafin: string;
      articulosIds: number[];
    },
  ): Promise<void> {
    // Extraer las propiedades del cuerpo de la solicitud
    const { descripcion, fechainicio, fechafin, articulosIds } = requestBody;

    // Convertir las fechas al formato aceptado (DD/MM/YYYY -> YYYY-MM-DD)
    const [diaInicio, mesInicio, anioInicio] = fechainicio.split('/');
    const fechaInicioFormatted = `${anioInicio}-${mesInicio}-${diaInicio}`;

    const [diaFin, mesFin, anioFin] = fechafin.split('/');
    const fechaFinFormatted = `${anioFin}-${mesFin}-${diaFin}`;

    try {
      // Eliminar las relaciones existentes entre la promoción y los artículos
      await this.articuloPromocionRepository.deleteAll({id_promocion: id});

      // Agregar nuevas relaciones entre la promoción y los artículos
      for (const articuloId of articulosIds) {
        await this.articuloPromocionRepository.create({
          id_articulo: articuloId,
          id_promocion: id,
        });
      }

      // Actualizar las propiedades de la promoción si es necesario
      await this.promocionesRepository.updateById(id, {
        descripcion,
        fechainicio: fechaInicioFormatted,
        fechafin: fechaFinFormatted,
      });
      console.log('Relaciones creadas/actualizadas correctamente');
    } catch (error) {
      // Manejar el error (por ejemplo, artículo no encontrado) y enviar una respuesta adecuada
      console.error('Error al actualizar las relaciones:', error);
      throw new HttpErrors.BadRequest(
        'Uno o más artículos no fueron encontrados',
      );
    }
  }

  @post('/promociones')
  @response(200, {
    description: 'Promociones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Promociones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promociones, {
            title: 'NewPromociones',
            exclude: ['id_promocion'],
          }),
        },
      },
    })
    promociones: Omit<Promociones, 'id_promocion'>,
  ): Promise<Promociones> {
    return this.promocionesRepository.create(promociones);
  }

  @get('/promociones/count')
  @response(200, {
    description: 'Promociones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Promociones) where?: Where<Promociones>,
  ): Promise<Count> {
    return this.promocionesRepository.count(where);
  }

  @get('/promociones')
  @response(200, {
    description: 'Array of Promociones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Promociones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Promociones) filter?: Filter<Promociones>,
  ): Promise<Promociones[]> {
    return this.promocionesRepository.find(filter);
  }

  @patch('/promociones')
  @response(200, {
    description: 'Promociones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promociones, {partial: true}),
        },
      },
    })
    promociones: Promociones,
    @param.where(Promociones) where?: Where<Promociones>,
  ): Promise<Count> {
    return this.promocionesRepository.updateAll(promociones, where);
  }

  @get('/promociones/{id}')
  @response(200, {
    description: 'Promociones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Promociones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Promociones, {exclude: 'where'})
    filter?: FilterExcludingWhere<Promociones>,
  ): Promise<Promociones> {
    return this.promocionesRepository.findById(id, filter);
  }

  @patch('/promociones/{id}')
  @response(204, {
    description: 'Promociones PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promociones, {partial: true}),
        },
      },
    })
    promociones: Promociones,
  ): Promise<void> {
    await this.promocionesRepository.updateById(id, promociones);
  }

  @put('/promociones/{id}')
  @response(204, {
    description: 'Promociones PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() promociones: Promociones,
  ): Promise<void> {
    await this.promocionesRepository.replaceById(id, promociones);
  }

  @del('/promociones/{id}')
  @response(204, {
    description: 'Promociones DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.promocionesRepository.deleteById(id);
  }
}
