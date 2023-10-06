import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Seccion} from './seccion.model';
import { ProductosRedimidos } from './productos-redimidos.model';

@model({settings: {strict: false}})
export class Articulos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codarticulos?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    default: '-',
  })
  proveedor?: string;

  @property({
    type: 'string',
    default: '-',
  })
  unidadMedida?: string;

  @property({
    type: 'string',
    default: '-',
  })
  medidaReferencia?: string;

  @property({
    type: 'string',
    default: '-',
  })
  tipoArticulo?: string;

  @property({
    type: 'number',
  })
  stock?: number;


  // Define well-known properties here
  
  @belongsTo(() => Departamento) // Relación con Departamento
  id_dpto: number; 

  @belongsTo(() => Seccion) // Relacion con seccion
  id_seccion: number; 

  @belongsTo(()=> ProductosRedimidos)
  id_productos_redimidos: number;

  // Indexer property to allow additional data
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Articulos>) {
    super(data);
  }
}

export interface ArticulosRelations {
  // describe navigational properties here
}

export type ArticulosWithRelations = Articulos & ArticulosRelations;
