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
import {Clientes,Tarjetas} from '../models';
import {ClientesRepository,TarjetasRepository} from '../repositories';

export class ClientesController {
  constructor(
    @repository(ClientesRepository)
    public clientesRepository : ClientesRepository,

    @repository(TarjetasRepository)
    public tarjetasRepo: TarjetasRepository,
  ) {}

  @get('/clientes/{id}/balance')
  async getCardBalance(
    @param.path.number('id') id: number,
  ): Promise<number|undefined> {
    try {
      const customer = await this.clientesRepository.findById(id, {
        include: [{ relation: 'tarjetas' }], // Use an array for multiple inclusions
      });

      if (!customer) {
        console.log("Error no se encontro el cliente")
      }

      if (customer.tarjetas && customer.tarjetas.length > 0) {
        return customer.tarjetas[0].saldotarjeta || 0;
      }

      return 0; // No cards or no balance
    } catch (error) {
      console.log("Error en try")
      console.log(error)
      // Handle other unexpected errors here
    }
  }

  @get('/clientes/cedula/{Cedula}')
  async findByCedula(
    @param.path.number('Cedula') cedula: number,
  ): Promise<number | undefined> {
    const cliente = await this.clientesRepository.findOne({
      where: {
        cif: cedula,
      },
      include: [{ relation: 'tarjetas' }],
    });

    if (cliente) {
      if (cliente.tarjetas && cliente.tarjetas.length > 0) {
        return cliente.tarjetas[0].id_tarjeta || 0;
      } else {
        return 0; // Si el cliente no tiene tarjetas, puedes devolver un valor predeterminado
      }
    } else {
      return undefined; // El cliente no se encontró, puedes devolver undefined o un valor específico si lo deseas
    }
  }


  @post('/clientes')
  @response(200, {
    description: 'Clientes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Clientes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {
            title: 'NewClientes',
            exclude: ['id_cliente'],
          }),
        },
      },
    })
    clientes: Omit<Clientes, 'id_cliente'>,
  ): Promise<Clientes> {

    var cliente = this.clientesRepository.create(clientes)

    const tarjetaNueva = new Tarjetas({
      id_cliente:(await cliente).id_cliente,
      descripcion:"Tarjeta creada desde la app",
      valida:1,
      saldotarjeta:0,
      entregada:"N",
      codmoneda:"COP"
    })

    this.tarjetasRepo.create(tarjetaNueva)
    return this.clientesRepository.create(clientes);
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Clientes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Clientes) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.clientesRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Clientes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Clientes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Clientes) filter?: Filter<Clientes>,
  ): Promise<Clientes[]> {
    return this.clientesRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Clientes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Clientes,
    @param.where(Clientes) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.clientesRepository.updateAll(clientes, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Clientes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Clientes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Clientes, {exclude: 'where'}) filter?: FilterExcludingWhere<Clientes>
  ): Promise<Clientes> {
    return this.clientesRepository.findById(id, filter);
  }



  @patch('/clientes/{id}')
  @response(204, {
    description: 'Clientes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Clientes,
  ): Promise<void> {
    await this.clientesRepository.updateById(id, clientes);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Clientes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() clientes: Clientes,
  ): Promise<void> {
    await this.clientesRepository.replaceById(id, clientes);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Clientes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clientesRepository.deleteById(id);
  }
}
