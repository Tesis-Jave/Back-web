import {Entity, model, property} from '@loopback/repository';

@model()
export class Preciosventa extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_preciosventa?: number;


  // @property({
  //   type: 'number',
  //   required: true,
  @property({
    type: 'number',
  })
  id_articulo?: number;

  @property({
    type: 'number',
  })
  id_tarifa?: number;
  // })
  // id_tarifa: number;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // id_articulo: number;

  @property({
    type: 'number',
    required: true,
  })
  preciobruto: number;

  @property({
    type: 'number',
    required: true,
  })
  dto: number;

  @property({
    type: 'number',
    required: true,
  })
  precioneto: number;


  constructor(data?: Partial<Preciosventa>) {
    super(data);
  }
}

export interface PreciosventaRelations {
  // describe navigational properties here
}

export type PreciosventaWithRelations = Preciosventa & PreciosventaRelations;
