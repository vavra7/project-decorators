import { ControllerClassMetadata } from './definitions';
import { ensureReflectMetadataExists } from './utils';

export class MetadataStorage {
  public controllerClasses: Array<ControllerClassMetadata> = [];

  constructor() {
    ensureReflectMetadataExists();
  }

  public collectControllerClassMetadata(definition: ControllerClassMetadata): void {
    this.controllerClasses.push(definition);
  }
}

export function getMetadataStorage(): MetadataStorage {
  if (global.TypeExpressMetadataStorage) {
    return global.TypeExpressMetadataStorage;
  } else {
    return new MetadataStorage();
  }
}
