import { Injectable } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { GlobalStateModule } from './global.module';

@Injectable()
export class GlobalStateService {
  private token: string;
  private user:UserEntity;

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  setUserGoble(user: UserEntity) {
    this.user = user;
  }

  getUserGlobal(): UserEntity {
    return this.user;
  }
}




