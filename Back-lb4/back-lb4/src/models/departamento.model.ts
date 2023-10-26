import {Entity, hasMany, model, property} from '@loopback/repository';
import {Articulos} from './articulos.model';
import {Seccion} from './seccion.model';

@model()
export class Departamento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_dpto?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
  })
  url?: string;

  @hasMany(() => Seccion, {keyTo: 'id_dpto'})
  secciones: Seccion[];

  @hasMany(() => Articulos, {keyTo: 'id_dpto'})
  articulos: Articulos[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
