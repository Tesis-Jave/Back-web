import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Articulos} from './articulos.model';

@model()
export class Seccion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_seccion?: number;

  @belongsTo(() => Departamento, {name: 'departamento'})
  id_dpto: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Articulos, {keyTo: 'id_seccion'})
  articulos: Articulos[];

  constructor(data?: Partial<Seccion>) {
    super(data);
  }
}

export interface SeccionRelations {
  // describe navigational properties here
}

export type SeccionWithRelations = Seccion & SeccionRelations;
