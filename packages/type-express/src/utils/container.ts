import { Container, TClass } from '../types';

/**
 * Default inversion of control container.
 * Used when no custom container was provided.
 */
export class DefaultContainer {
  private instances: Array<{ type: TClass<any>; object: any }> = [];

  public get<T>(someClass: TClass<T>): T {
    let instance;
    instance = this.instances.find(it => it.type === someClass);
    if (!instance) {
      instance = { type: someClass, object: new (someClass as any)() };
      this.instances.push(instance);
    }
    return instance.object;
  }
}

/**
 * General inversion of control container.
 * Provides custom or default container.
 * Logic copied from package type-graphgl.
 */
export class IOCContainer {
  private readonly defaultContainer = new DefaultContainer();
  private insertedContainer?: any;

  constructor(insertedContainer?: Container) {
    if (
      insertedContainer &&
      'get' in insertedContainer &&
      typeof insertedContainer.get === 'function'
    ) {
      this.insertedContainer = insertedContainer;
    }
  }

  public getInstance<T>(someClass: TClass<T>): any {
    if (this.insertedContainer) {
      return this.insertedContainer.get(someClass);
    } else {
      return this.defaultContainer.get(someClass);
    }
  }
}
