import {Entity, model, property, hasMany} from '@loopback/repository';
import {Tarjetas} from './tarjetas.model';

@model()
export class Clientes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id_cliente: number;

  @property({
    type: 'string',
  })
  nombrecliente?: string;

  @property({
    type: 'string',
  })
  nombrecomercial?: string;

  @property({
    type: 'number',
  })
  cif?: number;

  @property({
    type: 'string',
  })
  alias?: string;

  @property({
    type: 'string',
  })
  direccion1?: string;

  @property({
    type: 'number',
  })
  telefono1?: number;

  @property({
    type: 'string',
  })
  fax?: string;

  @property({
    type: 'string',
  })
  faxpedidos?: string;

  @property({
    type: 'string',
  })
  e_mail?: string;

  @property({
    type: 'string',
  })
  digcontrolblanco?: string;

  @property({
    type: 'string',
  })
  codpostalbanco?: string;

  @property({
    type: 'string',
  })
  nombrebanco?: string;

  @property({
    type: 'string',
  })
  poblacionbanco?: string;

  @property({
    type: 'date',
  })
  fechanacimiento?: string;

  @property({
    type: 'string',
  })
  sexo?: string;

  @property({
    type: 'string',
  })
  nif20?: string;

  @property({
    type: 'number',
  })
  descatalogado?: number;

  @property({
    type: 'number',
  })
  tipocliente?: number;

  @hasMany(() => Tarjetas, {keyTo: 'id_cliente'})
  tarjetas: Tarjetas[];

  constructor(data?: Partial<Clientes>) {
    super(data);
  }
}

export interface ClientesRelations {
  // describe navigational properties here
}

export type ClientesWithRelations = Clientes & ClientesRelations;
