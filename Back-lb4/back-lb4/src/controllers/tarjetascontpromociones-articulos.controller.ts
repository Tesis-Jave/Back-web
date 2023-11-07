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
Tarjetascontpromociones,
Productosredimidos,
Articulos,
} from '../models';
import {TarjetascontpromocionesRepository,ArticulosRepository,ProductosredimidosRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

// Define el tipo PromocionWithArticulos
interface TransaccionProductos {
  id_transaccion: number|undefined;
  id_cliente:number|undefined;
  productos: Articulos[];
}

@authenticate('jwt')
export class TarjetascontpromocionesArticulosController {
  constructor(
    @repository(TarjetascontpromocionesRepository) protected tarjetascontpromocionesRepository: TarjetascontpromocionesRepository,
    @repository(ArticulosRepository) protected articulosRepository: ArticulosRepository,
    @repository(ProductosredimidosRepository) protected productosRedimidosRepo: ProductosredimidosRepository,
  ) { }

  @get('/tarjetascontpromociones/all-articulos', {
    responses: {
      '200': {
        description: 'Array of Articulos associated with the specified Tarjetascontpromociones',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Articulos } },
          },
        },
      },
    },
  })
  async findAllArticulos(): Promise<(TransaccionProductos)[]> {
    const tarjetascontpromociones: Tarjetascontpromociones[] = await this.tarjetascontpromocionesRepository.find();
    var transacciones:TransaccionProductos[]=[]
    for ( var i =0;i<tarjetascontpromociones.length;i++){
      var transaccionesAux = await this.productosRedimidosRepo.find({
        where:{
          id_transaccion:tarjetascontpromociones[i].id_transaccion,
        },
      })
      if(transaccionesAux.length>0){
        
        const idTransaccion = tarjetascontpromociones[i].id_transaccion;
        const idCliente = tarjetascontpromociones[i].id_tarjeta;
        const productos : Articulos[]=[]

        for(var a = 0; a<transaccionesAux.length;a++){
          productos.push(await this.articulosRepository.findById(transaccionesAux[a].id_articulo))
        }

        transacciones.push({id_transaccion:idTransaccion,id_cliente:idCliente,productos:productos})
      }
    }
    if (!tarjetascontpromociones) {
      throw new Error('Tarjetascontpromociones not found');
    }
    // Obtener los IDs de Articulos de la propiedad articulosredimidos
    return transacciones;
  }

  @get('/tarjetascontpromociones/{id}/articulos', {
    responses: {
      '200': {
        description: 'Array of Tarjetascontpromociones has many Articulos through Productosredimidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Articulos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Articulos>,
  ): Promise<Articulos[]> {
    return this.tarjetascontpromocionesRepository.articulosredimidos(id).find(filter);
  }

  @post('/tarjetascontpromociones/{id}/articulos', {
    responses: {
      '200': {
        description: 'create a Articulos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Articulos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tarjetascontpromociones.prototype.id_transaccion,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulos, {
            title: 'NewArticulosInTarjetascontpromociones',
            exclude: ['id_articulo'],
          }),
        },
      },
    }) articulos: Omit<Articulos, 'id_articulo'>,
  ): Promise<Articulos> {
    return this.tarjetascontpromocionesRepository.articulosredimidos(id).create(articulos);
  }

  @patch('/tarjetascontpromociones/{id}/articulos', {
    responses: {
      '200': {
        description: 'Tarjetascontpromociones.Articulos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulos, {partial: true}),
        },
      },
    })
    articulos: Partial<Articulos>,
    @param.query.object('where', getWhereSchemaFor(Articulos)) where?: Where<Articulos>,
  ): Promise<Count> {
    return this.tarjetascontpromocionesRepository.articulosredimidos(id).patch(articulos, where);
  }

  @del('/tarjetascontpromociones/{id}/articulos', {
    responses: {
      '200': {
        description: 'Tarjetascontpromociones.Articulos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Articulos)) where?: Where<Articulos>,
  ): Promise<Count> {
    return this.tarjetascontpromocionesRepository.articulosredimidos(id).delete(where);
  }
}
