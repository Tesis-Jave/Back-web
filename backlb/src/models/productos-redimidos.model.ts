import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Articulos } from './articulos.model';
import { TarjetasContPromociones } from './tarjetas-cont-promociones.model';

@model({settings: {strict: false}})
export class ProductosRedimidos extends Entity {
  // Define well-known properties here
  @property({
    type: 'number',
    id: true, // Esta propiedad es parte de la clave primaria
    required: true,
  })
  id_Articulo: number;

  @property({
    type: 'number',
    id: true, // Esta propiedad es parte de la clave primaria
    required: true,
  })
  id_TarjetaContPromocion: number;
  // ... otras propiedades de la tabla PRODUCTOSREDIMIDOS

  @belongsTo(() => Articulos, {keyFrom: 'idArticulo', name: 'articulo'})
  idArticulo: number;

  @belongsTo(() => TarjetasContPromociones, {keyFrom: 'idTransaccion', name: 'transaccion'})
  idTransaccion: number;
  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProductosRedimidos>) {
    super(data);
  }
}

export interface ProductosRedimidosRelations {
  // describe navigational properties here
}

export type ProductosRedimidosWithRelations = ProductosRedimidos & ProductosRedimidosRelations;
