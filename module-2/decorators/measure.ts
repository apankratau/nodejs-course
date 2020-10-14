import { performance } from 'perf_hooks';
import { ObjectWithNameProp, serviceFunction } from '../core/types/utility';
import logger from '../core/logger';

const measure = (
  target: ObjectWithNameProp,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor => {
  const originalMethod = <serviceFunction>descriptor.value;

  descriptor.value = function (...args: any) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    result.finally(() => {
      const finish = performance.now();
      logger.info(`${target.name}.${propertyKey} execution time: ${finish - start}ms`);
    });
    return result;
  };

  return descriptor;
};

export default measure;
