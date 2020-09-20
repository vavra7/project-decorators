import { Request, Response } from 'express';
import routesDecorator, { Get } from '../decorators/routes.decorator';

export class Users {
  @routesDecorator({
    path: '/users',
    method: 'get'
  })
  getUsers(req: Request, res: Response): void {
    res.send('Typescript Decorators are awesome !!!');
  }

  /**
   * Test decorated route
   */
  @Get('/test')
  test(req: Request, res: Response): void {
    res.send('get route');
  }
}
