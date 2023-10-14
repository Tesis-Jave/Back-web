import {Entity, model, property, hasMany} from '@loopback/repository';
import {Seccion} from './seccion.model';
import {Articulos} from './articulos.model';

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
