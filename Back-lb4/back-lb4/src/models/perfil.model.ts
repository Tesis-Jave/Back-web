import {Entity, model, property} from '@loopback/repository';

@model()
export class Perfil extends Entity{
  
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_perfil?: number;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  cedula: number;

  @property({
    type: 'string',
  })
  cargo?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  admin: boolean;

  constructor(data?: Partial<Perfil>) {
    super(data);
  }
}

export interface PerfilRelations {
  // describe navigational properties here
}

export type PerfilWithRelations = Perfil & PerfilRelations;
