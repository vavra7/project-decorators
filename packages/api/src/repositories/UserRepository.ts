import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from '../entities';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  public findById(id: User['id']): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  public findByEmail(email: User['email']): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  public create(newUser: {
    email: User['email'];
    firstName: User['firstName'];
    lastName: User['lastName'];
    password: User['password'];
    preferredLanguage?: User['preferredLanguage'];
  }): Promise<User> {
    return this.manager.save(Object.assign(new User(), newUser));
  }
}
