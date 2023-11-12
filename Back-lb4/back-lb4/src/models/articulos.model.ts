import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Seccion} from './seccion.model';
import {Departamento} from './departamento.model';
import {Promociones} from './promociones.model';
import {Articulopromocion} from './articulopromocion.model';
import {Tarifasventa} from './tarifasventa.model';
import {Preciosventa} from './preciosventa.model';

@model()
export class Articulos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_articulo?: number;

  @belongsTo(() => Departamento, {name: 'departamento'})
  id_dpto: number;

  @belongsTo(() => Seccion, {name: 'secciones'})
  id_seccion: number;


  // llaves foraneas
  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // id_dpto: number;

  // @property({
  @hasMany(() => Promociones, {through: {model: () => Articulopromocion, keyFrom: 'id_articulo', keyTo: 'id_promocion'}})
  promociones: Promociones[];

  @hasMany(() => Tarifasventa, {through: {model: () => Preciosventa, keyFrom: 'id_articulo', keyTo: 'id_tarifa'}})
  tarifasventas: Tarifasventa[];
  //   type: 'number',
  //   required: true,
  // })
  // id_seccion: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
  })
  proveedor?: string;

  @property({
    type: 'string',
  })
  unidadmedida?: string;

  @property({
    type: 'string',
  })
  medidareferencia?: string;

  @property({
    type: 'string',
  })
  tipoarticulo?: string;

  @property({
    type: 'number',
  })
  stock?: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;


  constructor(data?: Partial<Articulos>) {
    super(data);
  }
}

export interface ArticulosRelations {
  // describe navigational properties here
}

export type ArticulosWithRelations = Articulos & ArticulosRelations;
