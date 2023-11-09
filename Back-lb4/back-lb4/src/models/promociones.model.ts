import {Entity, model, property} from '@loopback/repository';

@model()
export class Promociones extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_promocion?: number;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechainicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechafin: string;

  // @property({
  //   type: 'array',
  //   itemType: 'number',
  // })
  // articulosIds?: number[];


  constructor(data?: Partial<Promociones>) {
    super(data);
  }
}

export interface PromocionesRelations {
  // describe navigational properties here
}

export type PromocionesWithRelations = Promociones & PromocionesRelations;
