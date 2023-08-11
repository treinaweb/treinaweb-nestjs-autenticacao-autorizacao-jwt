import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return {
      usuários: [
        {
          nome: 'Elton',
          endereco: 'Av. Paulista 1250',
          telefone: '555-555',
        },
        {
          nome: 'Bruna',
          endereco: 'Av. Sapopemba 1250',
          telefone: '556-555',
        },
        {
          nome: 'Felipe',
          endereco: 'Av. Utama 1250',
          telefone: '555-000',
        },
      ],
    };
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  findOneByEmail(username: string) {
    return this.userRepository.findOneBy({ email: username });
  }
}
