import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Clientes} from './clientes.model';

@model({settings: {strict: false}})
export class Tarjetas extends Entity {
  // Define well-known properties here
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idTarjetas?: number;

  @property({
    type: 'number',
  })
  posicion?: number;

  @property({
    type: 'number',
  })
  idTipoTarjeta?: number;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'date',
  })
  caducidad?: Date;

  @property({
    type: 'boolean',
  })
  valida?: boolean;

  @property({
    type: 'number',
  })
  saldoTarjeta?: number;

  @property({
    type: 'string',
  })
  entregada?: string;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @property({
    type: 'string',
  })
  alias?: string;

  @property({
    type: 'string',
  })
  codMoneda?: string;

  @belongsTo(() => Clientes)
  codCliente: number;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tarjetas>) {
    super(data);
  }
}

export interface TarjetasRelations {
  // describe navigational properties here
}

export type TarjetasWithRelations = Tarjetas & TarjetasRelations;
