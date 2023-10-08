import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import { Departamento } from './departamento.model';
import { Articulos } from './articulos.model';

@model()
export class Seccion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_Seccion?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;
  
  @belongsTo(()=> Departamento)
  id_Dpto: number;

  @hasMany(()=>Articulos)
  articulos: Articulos[];

  constructor(data?: Partial<Seccion>) {
    super(data);
  }
}

export interface SeccionRelations {
  // describe navigational properties here
}

export type SeccionWithRelations = Seccion & SeccionRelations;
