import { ControllerClassMetadata } from './ControllerClassMetadata';
import { HandlerParamMetadata } from './HandlerParamMetadata';

export interface RequestHandlerMetadata {
  methodName: string;
  class: Function;
  path: string;
  classMetadata?: ControllerClassMetadata;
  paramsMetadata?: Array<HandlerParamMetadata>;
}
