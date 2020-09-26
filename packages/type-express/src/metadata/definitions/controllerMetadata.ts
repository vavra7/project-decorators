export interface ControllerMetadata {
  methodName: string;
  target: Function;
  path: string;
  controllerClassMetadata?: ControllerClassMetadata;
}

export interface ControllerClassMetadata {
  target: Function;
  path: string;
}
