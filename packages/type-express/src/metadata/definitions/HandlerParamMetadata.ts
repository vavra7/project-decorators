export interface HandlerParamMetadata {
  paramKind: 'body' | 'params' | 'ctx';
  class: Function;
  methodName: string;
  parameterIndex: number;
  type: any;
}
