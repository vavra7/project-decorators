export interface HandlerParamMetadata {
  paramKind: 'body' | 'params';
  class: Function;
  methodName: string;
  parameterIndex: number;
  type: any;
}
