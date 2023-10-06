import {Entity, hasMany, model, property} from '@loopback/repository';
import { Tarjetas } from './tarjetas.model';
import { TarjetasContPromociones } from './tarjetas-cont-promociones.model';


@model({settings: {strict: false}})
export class Clientes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codCliente?: number;

  @property({
    type: 'string',
  })
  nombreCliente?: string;

  @property({
    type: 'string',
  })
  nombreComercial?: string;

  @property({
    type: 'number',
  })
  CIF?: number;

  @property({
    type: 'string',
  })
  alias?: string;

  @property({
    type: 'string',
  })
  direccion?: string;

  @property({
    type: 'number',
  })
  telefono?: number;

  @property({
    type: 'string',
  })
  fax?: string;

  @property({
    type: 'string',
  })
  faxPedidos?: string;

  @property({
    type: 'string',
  })
  e_mail?: string;

  @property({
    type: 'string',
  })
  digControlBlanco?: string;

  @property({
    type: 'string',
  })
  nombreBanco?: string;

  @property({
    type: 'string',
  })
  codPostalBanco?: string;

  @property({
    type: 'string',
  })
  poblacionBanco?: string;

  @property({
    type: 'date',
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
  })
  sexo?: string;
  
  @property	({
    type: 'string',
  })
  nif20?:string;
  
  @property({
    type: 'number',
  }) 
  descatalogado?: number;

  @property({
    type: 'number',
  })
  tipoCliente?: number;

  @hasMany(() => Tarjetas, {keyTo: 'codCliente'})
  tarjetas: Tarjetas[];

  @hasMany(() => TarjetasContPromociones, {keyTo: 'codCliente'})
  tarjetasConPromociones: TarjetasContPromociones[];
  
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Clientes>) {
    super(data);
  }
}

export interface ClientesRelations {
  // describe navigational properties here
}

export type ClientesWithRelations = Clientes & ClientesRelations;
