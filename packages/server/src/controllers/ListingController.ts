import { Controller, Get } from '@project-decorators/express-decorators';
import { ListingHandler } from '../handlers/ListingHandler';

@Controller('/listing')
export class ListingController {
  private handler: ListingHandler;

  constructor() {
    this.handler = new ListingHandler();
  }

  /**
   * Test decorated route
   */
  @Get('/')
  public getUser(): string {
    return this.handler.getListing();
  }
}
