import { JWTService } from '@loopback/authentication-jwt';
import { Perfil } from '../models';
import { UserProfile } from '../models/UserProfile';

export class MyJWTService extends JWTService {
  // Implementa tu propia lógica para generar un token JWT
  async generateToken(payload: UserProfile): Promise<string> {
    // Personaliza la generación del token aquí
    // Puedes utilizar la biblioteca jsonwebtoken o cualquier otra de tu elección
    // Asegúrate de devolver un token JWT válido
    // Ejemplo:
    const token = 'mi-token-generado'; // Reemplaza con tu lógica real

    return token;
  }
}
