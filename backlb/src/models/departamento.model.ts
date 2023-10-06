import {
  Entity,
  belongsTo,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Seccion} from './seccion.model';
import {Articulos} from './articulos.model';

@model()
export class Departamento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_Dpto?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Seccion) // un departamento tiene muchas secciones
  secciones: [];

  @hasMany(() => Articulos) // Define la relación con Articulo
  articulos: Articulos[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
