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
  Departamento,
} from '../models';
import {ArticulosRepository} from '../repositories';

export class ArticulosDepartamentoController {
  constructor(
    @repository(ArticulosRepository)
    public articulosRepository: ArticulosRepository,
  ) { }

  @get('/articulos/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Articulos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Departamento),
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.number('id') id: typeof Articulos.prototype.id_articulo,
  ): Promise<Departamento> {
    return this.articulosRepository.departamento(id);
  }
}
