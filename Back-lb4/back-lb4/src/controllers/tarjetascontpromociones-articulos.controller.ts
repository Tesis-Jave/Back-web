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
Tarjetas
} from '../models';
import {TarjetascontpromocionesRepository,ArticulosRepository,ProductosredimidosRepository,TarjetasRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import * as fs from 'fs';
import { FPGrowth } from 'node-fpgrowth';

// Define el tipo Item
interface Transaccion{
  id_cliente:number,
  articulos:number[]
}

// Define una interfaz para Itemset
interface Itemset<T> {
  items: T;
  support: number;
}

@authenticate('jwt')
export class TarjetascontpromocionesArticulosController {
  constructor(
    @repository(TarjetascontpromocionesRepository) protected tarjetascontpromocionesRepository: TarjetascontpromocionesRepository,
    @repository(ArticulosRepository) protected articulosRepository: ArticulosRepository,
    @repository(ProductosredimidosRepository) protected productosRedimidosRepo: ProductosredimidosRepository,
    @repository(TarjetasRepository) protected tarjetasRepository: TarjetasRepository,
  ) { }

  // Endpoint para obtener recomendaciones basadas en filtrado colaborativo
  @get('/tarjetascontpromociones/recomendaciones/{id}', {
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
  async findCollaborativeFilteringRecommendations(@param.path.number('id') id: number): Promise<Articulos[] | null> {
    // Obtén las transacciones asociadas con el cliente actual
    const transaccionesClienteActual = await this.tarjetascontpromocionesRepository.find({
      where: {
        id_tarjeta: id, // ID del cliente para el que se generan recomendaciones
      },
    });

    // Extrae los IDs de transacción de las transacciones encontradas
    const comprasClienteActualIds = transaccionesClienteActual.map((transaccion) => transaccion.id_transaccion);

    // Obtén las compras anteriores del cliente actual (el cliente para el que se generan recomendaciones)
    const comprasClienteActual = await this.tarjetascontpromocionesRepository.articulosredimidos(id).find();

    // Obtén los productos comprados por el cliente actual
    const productosCompradosPorClienteActual = comprasClienteActual
      .map((compra) => compra.id_articulo)
      .filter((producto) => producto !== undefined) as number[];

    // Obtén la matriz de usuarios y compras
    const userPurchaseMatrix: { userId: number; products: number[] }[] = await this.buildUserPurchaseMatrix();

    // Supongamos que tienes una función llamada "getCollaborativeFilteringRecommendations" que toma el ID del cliente y sus compras como entrada
    const collaborativeRecommendations = this.getCollaborativeFilteringRecommendations(id, productosCompradosPorClienteActual, userPurchaseMatrix);

    // Si obtuviste recomendaciones, busca los detalles de los productos recomendados
    if (collaborativeRecommendations.length > 0) {
      const recommendedProductIds = collaborativeRecommendations.map((recommendation) => recommendation);
      const recommendedProducts = await this.articulosRepository.find({
        where: {
          id_articulo: { inq: recommendedProductIds },
        },
      });
      return recommendedProducts;
    } else {
      console.log(`No se encontraron recomendaciones para el cliente ${id}`);
      return null;
    }
  }

  async buildUserPurchaseMatrix(): Promise<{ userId: number; products: number[] }[]> {
    const tarjetascontpromociones = await this.tarjetascontpromocionesRepository.find();

    // Construye la matriz de usuarios y compras a partir de los datos reales en la base de datos
    const userPurchaseMatrix: { userId: number; products: number[] }[] = [];

    for (const tc of tarjetascontpromociones) {
      const userId = tc.id_tarjeta;

      const productosredimidos = await this.productosRedimidosRepo.find({
        where: {
          id_transaccion: tc.id_transaccion,
        },
      });

      const productIds = productosredimidos
        .map((producto) => producto.id_articulo)
        .filter((id) => typeof id === 'number') as number[];

      // Busca si el usuario ya existe en la matriz
      const userIndex = userPurchaseMatrix.findIndex((user) => user.userId === userId);

      if (userIndex !== -1) {
        userPurchaseMatrix[userIndex].products.push(...productIds);
      } else {
        userPurchaseMatrix.push({ userId, products: productIds });
      }
    }

    return userPurchaseMatrix;
  }



  getCollaborativeFilteringRecommendations(
    userId: number,
    userPurchases: number[],
    userPurchaseMatrix: { userId: number; products: number[] }[]
  ): number[] {
    const similarUsers: { userId: number; similarity: number }[] = [];
  
    // Calcular la similitud entre el usuario actual y otros usuarios
    for (const user of userPurchaseMatrix) {
      if (user.userId !== userId) {
        const commonProducts = userPurchases.filter((product) => user.products.includes(product));
        const similarity = commonProducts.length / Math.sqrt(userPurchases.length * user.products.length);
        similarUsers.push({ userId: user.userId, similarity });
      }
    }
  
    // Ordenar los usuarios por similitud en orden descendente
    similarUsers.sort((a, b) => b.similarity - a.similarity);
  
    // Obtener las recomendaciones de productos basadas en usuarios similares
    const recommendations: number[] = [];
    const mostSimilarUser = userPurchaseMatrix.find((u) => u.userId === similarUsers[0].userId);
    if (mostSimilarUser) {
      for (const product of mostSimilarUser.products) {
        if (!userPurchases.includes(product)) {
          recommendations.push(product);
        }
      }
    }
  
    return recommendations;
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
