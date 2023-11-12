import {MiddlewareSequence, RequestContext} from '@loopback/rest';
import cors from 'cors';

export class MySequence extends MiddlewareSequence {
  async handle(context: RequestContext) {
    // Agrega el middleware CORS para permitir solicitudes desde tu frontend Angular
    const corsMiddleware = cors({
      origin: '*', // Reemplaza con la URL de tu frontend Angular
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      optionsSuccessStatus: 204,
    });
    
    // Aplica el middleware CORS a la solicitud
    corsMiddleware(context.request, context.response, () => {
      // Llama al siguiente middleware en la secuencia después de que CORS se haya aplicado
      super.handle(context);
    });
  } 
}
