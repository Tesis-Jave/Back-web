import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Articulos,
  Seccion,
} from '../models';
import {ArticulosRepository} from '../repositories';

export class ArticulosSeccionController {
  constructor(
    @repository(ArticulosRepository)
    public articulosRepository: ArticulosRepository,
  ) { }

  @get('/articulos/{id}/seccion', {
    responses: {
      '200': {
        description: 'Seccion belonging to Articulos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Seccion),
          },
        },
      },
    },
  })
  async getSeccion(
    @param.path.number('id') id: typeof Articulos.prototype.id_articulo,
  ): Promise<Seccion> {
    return this.articulosRepository.secciones(id);
  }
}
