import {Entity, hasMany, model, property} from '@loopback/repository';
import { PreciosVenta } from './precios-venta.model';

@model({settings: {strict: false}})
export class TarifasVenta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_tarifa?: number;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaIni: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFin: string;

  // Define well-known properties here
  // @hasMany(()=> PreciosVenta)

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TarifasVenta>) {
    super(data);
  }
}

export interface TarifasVentaRelations {
  // describe navigational properties here
}

export type TarifasVentaWithRelations = TarifasVenta & TarifasVentaRelations;
