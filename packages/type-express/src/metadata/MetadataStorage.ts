import {
  AuthorizedHandlerMetadata,
  ControllerClassMetadata,
  HandlerParamMetadata,
  RequestHandlerMetadata
} from './definitions';
import { ensureReflectMetadataExists } from './utils';

export class MetadataStorage {
  public controllerClasses: Array<ControllerClassMetadata> = [];
  public getRoutes: Array<RequestHandlerMetadata> = [];
  public postRoutes: Array<RequestHandlerMetadata> = [];
  public handlerParams: Array<HandlerParamMetadata> = [];
  public authorizedHandlers: Array<AuthorizedHandlerMetadata> = [];

  constructor() {
    ensureReflectMetadataExists();
  }

  public collectControllerClassMetadata(definition: ControllerClassMetadata): void {
    this.controllerClasses.push(definition);
  }

  public collectGetMetadata(definition: RequestHandlerMetadata): void {
    this.getRoutes.push(definition);
  }

  public collectPostMetadata(definition: RequestHandlerMetadata): void {
    this.postRoutes.push(definition);
  }

  public collectParamsMetadata(definition: HandlerParamMetadata): void {
    this.handlerParams.push(definition);
  }

  public collectAuthorizedMetadata(definition: AuthorizedHandlerMetadata): void {
    this.authorizedHandlers.push(definition);
  }

  /**
   * Put all metadata together
   */
  public build(): void {
    this.buildControllersMetadata(this.getRoutes);
    this.buildControllersMetadata(this.postRoutes);
  }

  /**
   * Attaches ControllerClassMetadata, AuthorizedHandlerMetadata
   * and HandlerParamMetadata to RequestHandlerMetadata
   */
  private buildControllersMetadata(requestHandlerMetadata: Array<RequestHandlerMetadata>): void {
    requestHandlerMetadata.forEach(meta => {
      const controllerClass = this.controllerClasses.find(
        controller => controller.class === meta.class
      );
      meta.classMetadata = controllerClass;
      const authorizedHandler = this.authorizedHandlers.find(
        authorized => authorized.class === meta.class && authorized.methodName === meta.methodName
      );
      meta.authorized = authorizedHandler;
      const handlerParams = this.handlerParams.filter(
        param => param.class === meta.class && param.methodName === meta.methodName
      );
      meta.paramsMetadata = handlerParams;
    });
  }
}

export function getMetadataStorage(): MetadataStorage {
  if (global.typeExpressMetadataStorage) {
    return global.typeExpressMetadataStorage;
  } else {
    return (global.typeExpressMetadataStorage = new MetadataStorage());
  }
}
