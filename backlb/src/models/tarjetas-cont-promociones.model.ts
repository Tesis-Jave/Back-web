import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Cafeteria } from './cafeteria.model';
import { Tarjetas } from './tarjetas.model';


@model({settings: {strict: false}})
export class TarjetasContPromociones extends Entity {
  @property({
    type: 'number',
    required: true,
    id: true
  })
  id_transaccion: number;

  @property({
    type: 'number',
  })
  puntosRedimidos?: number;

  @property({
    type: 'date',
  })
  fecha?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;


  // Define well-known properties here
  @belongsTo(() => Cafeteria, {keyFrom: 'idCafeteria', name: 'cafeteria'})
  id_Cafeteria: number;

  @belongsTo(() => Tarjetas, {keyFrom: 'idTarjeta', name: 'tarjeta'})
  id_Tarjeta: number;


  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TarjetasContPromociones>) {
    super(data);
  }
}

export interface TarjetasContPromocionesRelations {
  // describe navigational properties here
}

export type TarjetasContPromocionesWithRelations = TarjetasContPromociones & TarjetasContPromocionesRelations;
