import {Entity, model, property} from '@loopback/repository';

@model()
export class Productosredimidos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_producto_redimido?: number;

  @property({
    type: 'number',
  })
  id_transaccion?: number;

  @property({
    type: 'number',
  })
  id_articulo?: number;
  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // id_transaccion: number;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // id_articulo: number;


  constructor(data?: Partial<Productosredimidos>) {
    super(data);
  }
}

export interface ProductosredimidosRelations {
  // describe navigational properties here
}

export type ProductosredimidosWithRelations = Productosredimidos & ProductosredimidosRelations;
