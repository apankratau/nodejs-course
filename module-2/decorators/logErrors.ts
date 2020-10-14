import { ObjectWithNameProp, serviceFunction } from '../core/types/utility';
import logger from '../core/logger';

const logErrors = (
  target: ObjectWithNameProp,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor => {
  const originalMethod = <serviceFunction>descriptor.value;

  descriptor.value = function (...args: any) {
    let result;
    try {
      result = originalMethod.apply(this, args);
    } catch (e) {
      logger.error(`Failed to call ${target.name}.${propertyKey} with following arguments:\n\t\t\t\t\t${String(args)}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      logger.error(e.message);
    } finally {
      return result ? result : originalMethod.apply(this, args);
    }
  };

  return descriptor;
};

export default logErrors;
