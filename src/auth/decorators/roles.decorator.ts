import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from 'src/users/enum/tipo-usuario.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TipoUsuario[]) => SetMetadata(ROLES_KEY, roles);
