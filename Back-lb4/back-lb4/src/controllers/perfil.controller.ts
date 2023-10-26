import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors
} from '@loopback/rest';
import {Perfil} from '../models';
import {PerfilRepository} from '../repositories';
import { inject } from '@loopback/core';
import { TokenServiceBindings } from '@loopback/authentication-jwt';
import { TokenService } from '@loopback/authentication';
import {authenticate} from '@loopback/authentication';
import { securityId, UserProfile } from '@loopback/security';



export class PerfilController {
  constructor(
    @inject (TokenServiceBindings.TOKEN_SERVICE)
    public jwtService:TokenService,

    @repository(PerfilRepository)
    public perfilRepository : PerfilRepository,
  ) {}

  @post('/perfils')
  @response(200, {
    description: 'Perfil model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Perfil),
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {
            title: 'NewPerfil',
            exclude: ['id_perfil'],
          }),
        },
      },
    })
    perfil: Omit<Perfil, 'id_perfil'>,
  ): Promise<{ perfil: Perfil, token: string }> {
    const perfiles = await this.perfilRepository.find();
    let existe = 0;
    for (let i =0 ;i<perfiles.length;i++){
      if (perfiles[i].usuario==perfil.usuario){
        existe=1;
      }
    }

    if (existe==0){
      const createdPerfil = await this.perfilRepository.create(perfil);
      const userProfile: UserProfile = {
        id_perfil: createdPerfil.id_perfil, // Proporciona el ID del perfil
        [securityId]: createdPerfil.usuario, // Agrega la propiedad [securityId] con el valor de usuario o un identificador único
        password: createdPerfil.password,
        usuario: createdPerfil.usuario,
        nombre: createdPerfil.nombre,
        cedula: createdPerfil.cedula,
        admin: createdPerfil.admin,
        // Otros campos personalizados si es necesario
      };


      // Genera un token JWT
      const token = await this.jwtService.generateToken(userProfile);

      return { perfil: createdPerfil, token };

    }else{
      throw new HttpErrors.Unauthorized('Usuario inválido');
    }

  }

  @post('/perfils/login')
  async login(
    @param.query.string('usuario') usuario:string,
    @param.query.string('password') password:string,
  ): Promise<{token: string }> {
    const perfil = await this.perfilRepository.findOne({
      where: {
        usuario: usuario,
      },
    });

    console.log(perfil?.usuario);
    console.log(perfil?.password);
    
    if (perfil && perfil.password===password) {
      const userProfile: UserProfile = {
        [securityId]: perfil.usuario, // Agrega la propiedad [securityId] con el valor del nombre de usuario
        id_perfil: perfil.id_perfil,
        // Otros campos personalizados si es necesario
      };
      // Genera un token JWT
      const token = await this.jwtService.generateToken(userProfile);

      return { token };
    }else{
      throw new HttpErrors.Unauthorized('Credenciales inválidas');
    }
  }


  @authenticate('jwt')
  @get('/perfils/count')
  @response(200, {
    description: 'Perfil model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Perfil) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.perfilRepository.count(where);
  }

  @authenticate('jwt')
  @get('/perfils')
  @response(200, {
    description: 'Array of Perfil model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Perfil, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Perfil) filter?: Filter<Perfil>,
  ): Promise<Perfil[]> {
    return this.perfilRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/perfils')
  @response(200, {
    description: 'Perfil PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {partial: true}),
        },
      },
    })
    perfil: Perfil,
    @param.where(Perfil) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.perfilRepository.updateAll(perfil, where);
  }

  @authenticate('jwt')
  @get('/perfils/{id}')
  @response(200, {
    description: 'Perfil model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Perfil, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Perfil, {exclude: 'where'}) filter?: FilterExcludingWhere<Perfil>
  ): Promise<Perfil> {
    return this.perfilRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/perfils/{id}')
  @response(204, {
    description: 'Perfil PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {partial: true}),
        },
      },
    })
    perfil: Perfil,
  ): Promise<void> {
    await this.perfilRepository.updateById(id, perfil);
  }

  @authenticate('jwt')
  @put('/perfils/{id}')
  @response(204, {
    description: 'Perfil PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() perfil: Perfil,
  ): Promise<void> {
    await this.perfilRepository.replaceById(id, perfil);
  }

  @authenticate('jwt')
  @del('/perfils/{id}')
  @response(204, {
    description: 'Perfil DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.perfilRepository.deleteById(id);
  }
}
