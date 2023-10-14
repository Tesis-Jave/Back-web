import {Entity, model, property} from '@loopback/repository';

@model()
export class Articulopromocion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_articulopromocion?: number;

  @property({
    type: 'number',
  })
  id_articulo?: number;

  @property({
    type: 'number',
  })
  id_promocion?: number;
  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // id_articulo: number;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // id_promocion: number;


  constructor(data?: Partial<Articulopromocion>) {
    super(data);
  }
}

export interface ArticulopromocionRelations {
  // describe navigational properties here
}

export type ArticulopromocionWithRelations = Articulopromocion & ArticulopromocionRelations;
