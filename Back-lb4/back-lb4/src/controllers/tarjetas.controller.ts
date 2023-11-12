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
import {Tarjetas,Tarjetascontpromociones} from '../models';
import {TarjetasRepository,TarjetascontpromocionesRepository} from '../repositories';

export class TarjetasController {
  constructor(
    @repository(TarjetasRepository)
    public tarjetasRepository : TarjetasRepository,
    @repository(TarjetascontpromocionesRepository)
    public tarjetascontRepository : TarjetascontpromocionesRepository,
  ) {}

  @post('/tarjetas')
  @response(200, {
    description: 'Tarjetas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tarjetas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetas, {
            title: 'NewTarjetas',
            exclude: ['id_tarjeta'],
          }),
        },
      },
    })
    tarjetas: Omit<Tarjetas, 'id_tarjeta'>,
  ): Promise<Tarjetas> {
    return this.tarjetasRepository.create(tarjetas);
  }

  @get('/tarjetas/count')
  @response(200, {
    description: 'Tarjetas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tarjetas) where?: Where<Tarjetas>,
  ): Promise<Count> {
    return this.tarjetasRepository.count(where);
  }

  @get('/tarjetas')
  @response(200, {
    description: 'Array of Tarjetas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tarjetas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tarjetas) filter?: Filter<Tarjetas>,
  ): Promise<Tarjetas[]> {
    return this.tarjetasRepository.find(filter);
  }

  @patch('/tarjetas')
  @response(200, {
    description: 'Tarjetas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetas, {partial: true}),
        },
      },
    })
    tarjetas: Tarjetas,
    @param.where(Tarjetas) where?: Where<Tarjetas>,
  ): Promise<Count> {
    return this.tarjetasRepository.updateAll(tarjetas, where);
  }

  @get('/tarjetas/{id}')
  @response(200, {
    description: 'Tarjetas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tarjetas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tarjetas, {exclude: 'where'}) filter?: FilterExcludingWhere<Tarjetas>
  ): Promise<Tarjetas> {
    return this.tarjetasRepository.findById(id, filter);
  }

  @get('/tarjetas/saldo/{id}')
  @response(200,{
    description: 'Tarjetas model instance',
    content:{
      'application/json':{
        schema:getModelSchemaRef(Tarjetas,{includeRelations:true}),
      },
    },
  })async findSaldo(
    @param.path.number('id') id:number,
    @param.filter(Tarjetas, {exclude: 'where'}) filter?: FilterExcludingWhere<Tarjetas>
  ):Promise <number|undefined>{
    const tarjeta = await this.tarjetasRepository.findOne({
      where:{
        id_tarjeta:id,
      },
    });
    return tarjeta?.saldotarjeta
  }

  @post('/tarjetas/enviar')
  async enviarPuntos(
    @param.query.string('Origen') origen:number,
    @param.query.string('Destino') destino:number,
    @param.query.string('cantidad') cantidad:number,
    @param.query.string('Description') descripcion:string,
    @param.query.string('fecha') fecha:Date,
  ): Promise <number>{
    const tarjeta=await this.tarjetasRepository.findById(origen);
    if(tarjeta?.saldotarjeta){
      if(tarjeta.saldotarjeta >= cantidad){
        const tarjetaD = await this.tarjetasRepository.findById(destino);
        if(tarjetaD?.saldotarjeta || tarjetaD?.saldotarjeta===0){
          tarjetaD.saldotarjeta = (tarjetaD?.saldotarjeta || 0) + Number(cantidad);
          await this.updateById(destino,tarjetaD)
          tarjeta.saldotarjeta=tarjeta.saldotarjeta-cantidad
          await this.updateById(origen,tarjeta)

          const nuevaTarjetaContPromocion = new Tarjetascontpromociones({
            id_tarjeta: origen, // Asignar el ID de la tarjeta destino
            id_cafeteria: 1, // Asignar el ID de la cafetería (ajusta según tus necesidades)
            puntosredimidos: cantidad, // Asignar la cantidad de puntos redimidos
            fecha: fecha, // Asignar la fecha actual o la fecha que desees
            descripcion:descripcion, // Asignar la descripción
          });

          try {
            await this.tarjetascontRepository.create(nuevaTarjetaContPromocion);
            return 1;
          } catch (error) {
            // Aquí puedes manejar el error de la manera que prefieras
            console.error("Error al crear un nuevo registro en tarjetascontRepository:", error);
            // Puedes lanzar una excepción personalizada o devolver false, según tus necesidades.
            return 0;
          }
        }
      }
    }
    return 1
  }

  @patch('/tarjetas/{id}')
  @response(204, {
    description: 'Tarjetas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetas, {partial: true}),
        },
      },
    })
    tarjetas: Tarjetas,
  ): Promise<void> {
    await this.tarjetasRepository.updateById(id, tarjetas);
  }

  @put('/tarjetas/{id}')
  @response(204, {
    description: 'Tarjetas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tarjetas: Tarjetas,
  ): Promise<void> {
    await this.tarjetasRepository.replaceById(id, tarjetas);
  }

  @del('/tarjetas/{id}')
  @response(204, {
    description: 'Tarjetas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tarjetasRepository.deleteById(id);
  }
}
