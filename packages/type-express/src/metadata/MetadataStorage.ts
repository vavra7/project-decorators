import { ControllerClassMetadata, ControllerMetadata } from './definitions';
import { ensureReflectMetadataExists } from './utils';

export class MetadataStorage {
  public controllerClasses: Array<ControllerClassMetadata> = [];
  public getRoutes: Array<ControllerMetadata> = [];
  public postRoutes: Array<ControllerMetadata> = [];

  constructor() {
    ensureReflectMetadataExists();
  }

  public collectControllerClassMetadata(definition: ControllerClassMetadata): void {
    this.controllerClasses.push(definition);
  }

  public collectGetMetadata(definition: ControllerMetadata): void {
    this.getRoutes.push(definition);
  }

  public collectPostMetadata(definition: ControllerMetadata): void {
    this.postRoutes.push(definition);
  }

  /**
   * Put all metadata together
   */
  public build(): void {
    this.buildControllersMetadata(this.getRoutes);
    this.buildControllersMetadata(this.postRoutes);
  }

  /**
   * Method is assigning class metadata
   * to http method's metadata
   */
  private buildControllersMetadata(controllerMetadata: Array<ControllerMetadata>): void {
    controllerMetadata.forEach(meta => {
      const controllerClassMetadata = this.controllerClasses.find(
        controller => controller.class === meta.class
      );
      meta.controllerClassMetadata = controllerClassMetadata;
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
