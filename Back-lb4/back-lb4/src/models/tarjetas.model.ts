import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Clientes} from './clientes.model';
import {Tarjetascontpromociones} from './tarjetascontpromociones.model';

@model()
export class Tarjetas extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_tarjeta?: number;

  @belongsTo(() => Clientes, {name: 'cliente'})
  id_cliente: number;
  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // id_cliente: number;

  @hasMany(() => Tarjetascontpromociones, {keyTo: 'id_tarjeta'})
  tarjetascontpromociones: Tarjetascontpromociones[];

  @property({
    type: 'number',
  })
  posicion?: number;

  // NO es id de ninguna tabla
  @property({
    type: 'number',
  })
  id_tipotarjeta?: number;

  @property({
    type: 'string',
  })
  descripcion?: string;

  

  @property({
    type: 'number',
  })
  valida?: number;

  @property({
    type: 'number',
  })
  saldotarjeta?: number;

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
  codmoneda?: string;


  constructor(data?: Partial<Tarjetas>) {
    super(data);
  }
}

export interface TarjetasRelations {
  // describe navigational properties here
}

export type TarjetasWithRelations = Tarjetas & TarjetasRelations;
