import { UserProfile as LoopBackUserProfile } from '@loopback/security';
export interface UserProfile extends LoopBackUserProfile {
    id_perfil?: number; // Cambia el tipo según tu modelo
    usuario: string;
    password: string;
    nombre: string;
    cedula: number;
    cargo?: string;
    admin: boolean;
    // Otras propiedades personalizadas del perfil de usuario
    // Puedes agregar más campos aquí según tus necesidades
  }