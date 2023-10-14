import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Tarifasventa} from './tarifasventa.model';
import {Tarjetascontpromociones} from './tarjetascontpromociones.model';

@model()
export class Cafeteria extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_cafeteria?: number;


  @belongsTo(() => Tarifasventa, {name: 'tarifa'})
  id_tarifa: number;


  // @property({
  //   type: 'number',
  //   required: true,
  // })
  @hasMany(() => Tarjetascontpromociones, {keyTo: 'id_cafeteria'})
  tarjetascontpromociones: Tarjetascontpromociones[];
  // id_tarifa: number;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'number',
  })
  longitud?: number;

  @property({
    type: 'number',
  })
  latitud?: number;

  @property({
    type: 'string',
  })
  tipo?: string;

  constructor(data?: Partial<Cafeteria>) {
    super(data);
  }
}

export interface CafeteriaRelations {
  // describe navigational properties here
}

export type CafeteriaWithRelations = Cafeteria & CafeteriaRelations;
