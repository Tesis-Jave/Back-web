import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Promociones extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_Promocion?: number;

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

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Promociones>) {
    super(data);
  }
}

export interface PromocionesRelations {
  // describe navigational properties here
}

export type PromocionesWithRelations = Promociones & PromocionesRelations;
