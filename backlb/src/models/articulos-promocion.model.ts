import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Articulos } from './articulos.model';
import { Promociones } from './promociones.model';

@model({settings: {strict: false}})
export class ArticulosPromocion extends Entity {
  // Define well-known properties here
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  codArticulo: number;

  @property({
    type: 'number',
    required: true,
  })
  idPromocion: number;

  @belongsTo(() => Articulos, {keyFrom: 'codArticulo', keyTo: 'codArticulo'})
  articulo: Articulos;

  @belongsTo(() => Promociones, {keyFrom: 'idPromocion', keyTo: 'idPromocion'})
  promocion?: Promociones;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ArticulosPromocion>) {
    super(data);
  }
}

export interface ArticulosPromocionRelations {
  // describe navigational properties here
}

export type ArticulosPromocionWithRelations = ArticulosPromocion & ArticulosPromocionRelations;
