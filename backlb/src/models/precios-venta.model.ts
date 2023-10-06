import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Articulos } from './articulos.model';
import { TarifasVenta } from './tarifas-venta.model';

@model({settings: {strict: false}})
export class PreciosVenta extends Entity {

  @property({
    type: 'number',
    id: true, // Esta propiedad es parte de la clave primaria
    required: true,
  })
  id_Tarifa: number;

  @property({
    type: 'number',
    id: true, // Esta propiedad es parte de la clave primaria
    required: true,
  })
  id_Articulo: number;

  @property({
    type: 'number',
    required: true,
  })
  precioBruto: number;

  @property({
    type: 'number',
    required: true,
  })
  dto: number;

  @property({
    type: 'number',
    required: true,
  })
  precioNeto: number;

  // Indexer property to allow additional data

  @belongsTo(() => TarifasVenta)
  idTarifa: number;

  @belongsTo(() => Articulos)
  idArticulo: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PreciosVenta>) {
    super(data);
  }
}

export interface PreciosVentaRelations {
  // describe navigational properties here
  tarifasVenta?: TarifasVenta; // Relación con TarifasVenta
  articulos?: Articulos; // Relación con Articulos
}

export type PreciosVentaWithRelations = PreciosVenta & PreciosVentaRelations;
