import { getMetadataStorage } from '../metadata/MetadataStorage';

export function Controller(path = '/'): ClassDecorator {
  return target => {
    getMetadataStorage().collectControllerClassMetadata({
      class: target,
      path
    });
  };
}
