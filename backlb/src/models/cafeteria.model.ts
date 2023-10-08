import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import { TarifasVenta } from './tarifas-venta.model';
import { PreciosVenta } from './precios-venta.model';

@model({settings: {strict: false}})
export class Cafeteria extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_Cafeteria?: number;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  longitud?: string;

  @property({
    type: 'string',
  })
  latitud?: string;

  @property({
    type: 'string',
  })
  tipo?: string;

  @property({
    type: 'number',
    required: true,
  })
  id_tarifa: number;

  // Define well-known properties here
  @belongsTo(() => TarifasVenta) // Relación con TarifasVenta
  idTarifa: number; // Llave foránea hacia TarifasVenta

  @hasMany(() => PreciosVenta) // Relación con PreciosVenta
  preciosVenta: PreciosVenta[]; // Representa una relación uno a muchos con PreciosVenta

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cafeteria>) {
    super(data);
  }
}

export interface CafeteriaRelations {
  // describe navigational properties here
}

export type CafeteriaWithRelations = Cafeteria & CafeteriaRelations;
