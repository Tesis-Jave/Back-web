import {model, property} from '@loopback/repository';

@model()
export class CrearPromocionRequestBody {
  @property.array(Number, { required: true })
  articulosIds: number[];

  @property({
    type: 'string', // Tipo de dato de la descripción (ajústalo según corresponda)
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string', // Tipo de dato de la fecha de inicio (ajústalo según corresponda)
    required: true,
  })
  fechainicio: string;

  @property({
    type: 'string', // Tipo de dato de la fecha de fin (ajústalo según corresponda)
    required: true,
  })
  fechafin: string;

  constructor(data?: Partial<CrearPromocionRequestBody>) {
    Object.assign(this, data);
  }
}
