import { ControllerClassMetadata, ControllerMetadata } from './definitions';
import { ensureReflectMetadataExists } from './utils';

export class MetadataStorage {
  public controllerClasses: Array<ControllerClassMetadata> = [];
  public getRoutes: Array<ControllerMetadata> = [];

  constructor() {
    ensureReflectMetadataExists();
  }

  public collectControllerClassMetadata(definition: ControllerClassMetadata): void {
    this.controllerClasses.push(definition);
  }

  public collectGetHandlerMetadata(definition: ControllerMetadata): void {
    this.getRoutes.push(definition);
  }

  public build(): void {
    this.buildControllersMetadata(this.getRoutes);
  }

  private buildControllersMetadata(controllerMetadata: Array<ControllerMetadata>): void {
    controllerMetadata.forEach(meta => {
      const controllerClassMetadata = this.controllerClasses.find(
        controller => controller.target === meta.target
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
