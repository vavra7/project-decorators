import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from '../entities';
import { DataNotFoundError } from '../errors';

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

  public async setConfirmed(userId: User['id']): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw new DataNotFoundError('User');
    user.confirmed = true;
    user.save();
    return user;
  }
}
