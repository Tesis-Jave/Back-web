import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { Perfil } from '../models';
import { inject } from '@loopback/core';
import { PerfilRepository } from '../repositories';

export class JWTStrategy extends Strategy {
  static readonly NAME = 'jwt';

  constructor(
    @inject('repositories.perfil.repository') public perfilRepository: PerfilRepository
  ) {
    const jwtOptions: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'BearerJP', // Reemplaza con tu clave secreta
    };

    super(jwtOptions, async (payload, done) => {
      const username = payload.sub;
      const password = payload.sub;

      // Realiza la validación de usuario aquí, por ejemplo, busca el usuario en la base de datos
      const users = await this.perfilRepository.find();

      for (let i = 0; i < users.length; i++) {
        if (users[i]?.usuario == username && users[i]?.password == password) {
          return done(null, users[i]);
        }
      }

      return done(null, false, { message: 'Usuario no encontrado' });
    });
  }
}

