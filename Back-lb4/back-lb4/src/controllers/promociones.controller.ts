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
  HttpErrors,
} from '@loopback/rest';
import {Promociones} from '../models';
import {PromocionesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import { ArticulopromocionRepository } from '../repositories';

import { model, property } from '@loopback/repository';
import {CrearPromocionRequestBody} from '../models/CreatePromocionRequestBody';


@authenticate('jwt')
export class PromocionesController {
  constructor(
    @repository(PromocionesRepository)
    public promocionesRepository : PromocionesRepository,
    @repository(ArticulopromocionRepository)
    public articuloPromocionRepository: ArticulopromocionRepository,
  ) {}


  // crear promocon con sus articulos relacionados
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
          required: ['descripcion', 'fechainicio', 'fechafin', 'articulosIds'],
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
  const { descripcion, fechainicio, fechafin, articulosIds } = requestBody;

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
            descripcion: { type: 'string' }, // Suponiendo que la descripción viene en el cuerpo de la solicitud
            fechainicio: { type: 'string' }, // Suponiendo que la fecha de inicio viene en el cuerpo de la solicitud
            fechafin: { type: 'string' }, // Suponiendo que la fecha de fin viene en el cuerpo de la solicitud
            articulosIds: { type: 'array', items: { type: 'number' } }, // Lista de IDs de artículos relacionados
          },
          required: ['descripcion', 'fechainicio', 'fechafin', 'articulosIds'],
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

  try {
    // Eliminar las relaciones existentes entre la promoción y los artículos
    await this.articuloPromocionRepository.deleteAll({ id_promocion: id });

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
      fechainicio,
      fechafin,
    });
  } catch (error) {
    // Manejar el error (por ejemplo, artículo no encontrado) y enviar una respuesta adecuada
    throw new HttpErrors.BadRequest('Uno o más artículos no fueron encontrados');
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
    @param.filter(Promociones, {exclude: 'where'}) filter?: FilterExcludingWhere<Promociones>
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

