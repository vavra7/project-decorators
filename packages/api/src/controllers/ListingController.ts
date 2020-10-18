import { Controller, Get } from '@project-decorators/type-express';
import { ListingHandler } from '../handlers/ListingHandler';

@Controller('/listing')
export class ListingController {
  private handler: ListingHandler;

  constructor() {
    this.handler = new ListingHandler();
  }

  @Get('/')
  public getListing(): string {
    return this.handler.getListing();
  }
}
