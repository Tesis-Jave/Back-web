import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cafeteria} from './cafeteria.model';

@model()
export class Tarifasventa extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_tarifa?: number;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaini: string;

  @property({
    type: 'date',
    required: true,
  })
  fechafin: string;

  @hasMany(() => Cafeteria, {keyTo: 'id_tarifa'})
  cafeterias: Cafeteria[];

  constructor(data?: Partial<Tarifasventa>) {
    super(data);
  }
}

export interface TarifasventaRelations {
  // describe navigational properties here
}

export type TarifasventaWithRelations = Tarifasventa & TarifasventaRelations;
