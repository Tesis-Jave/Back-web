import {Entity, belongsTo, model, property, hasMany} from '@loopback/repository';
import {Cafeteria} from './cafeteria.model';
import {Tarjetas} from './tarjetas.model';
import {Articulos} from './articulos.model';
import {Productosredimidos} from './productosredimidos.model';

@model()
export class Tarjetascontpromociones extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_transaccion?: number;

  @hasMany(() => Articulos, {through: {model: () => Productosredimidos, keyFrom: 'id_transaccion', keyTo: 'id_articulo'}})
  articulosredimidos: Articulos[];

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // id_tarjeta: number;
  @belongsTo(() => Tarjetas, {name: 'tarjeta'})
  id_tarjeta: number;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // id_cafeteria: number;
  @belongsTo(() => Cafeteria, {name: 'cafeteria'})
  id_cafeteria: number;

  @property({
    type: 'number',
  })
  puntosredimidos?: number;

  @property({
    type: 'date',
  })
  fecha?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  constructor(data?: Partial<Tarjetascontpromociones>) {
    super(data);
  }
}

export interface TarjetascontpromocionesRelations {
  // describe navigational properties here
}

export type TarjetascontpromocionesWithRelations = Tarjetascontpromociones &
  TarjetascontpromocionesRelations;
