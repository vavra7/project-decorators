export function BindThis(): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (!descriptor || typeof descriptor.value !== 'function') {
      throw new TypeError(
        `Only methods can be decorated with @BindThis(). <${propertyKey.toString()}> is not a method.`
      );
    }

    return {
      get(this) {
        return (descriptor.value as any).bind(this);
      }
    };
  };
}
