import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Seccion,
  Departamento,
} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionDepartamentoController {
  constructor(
    @repository(SeccionRepository)
    public seccionRepository: SeccionRepository,
  ) { }

  @get('/seccions/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Seccion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Departamento),
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.number('id') id: typeof Seccion.prototype.id_seccion,
  ): Promise<Departamento> {
    return this.seccionRepository.departamento(id);
  }
}
