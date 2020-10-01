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
 */
export class IOCContainer {
  private readonly defaultContainer = new DefaultContainer();

  constructor(iocContainerOrContainerGetter?: Container) {
    // TODO: option to insert custom container
    if (iocContainerOrContainerGetter) {
      console.error('Todo: implement custom container');
    }
  }

  public getInstance<T>(someClass: TClass<T>): T {
    return this.defaultContainer.get(someClass);
  }
}
