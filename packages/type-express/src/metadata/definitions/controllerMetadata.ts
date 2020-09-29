export interface ControllerMetadata {
  methodName: string;
  class: Function;
  path: string;
  controllerClassMetadata?: ControllerClassMetadata;
}

export interface ControllerClassMetadata {
  class: Function;
  path: string;
}
