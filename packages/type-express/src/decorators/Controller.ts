import { getMetadataStorage } from '../metadata/MetadataStorage';

export function Controller(): ClassDecorator {
  return target => {
    getMetadataStorage().collectControllerClassMetadata({
      target
    });
  };
}
