import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Pin } from '@app/lib/value-object/pin';

@ValidatorConstraint({ name: 'pinValidator', async: false })
export class PinValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    try {
      Pin.new(value);
      return true;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return `Pin ${args.value} is invalid`;
  }
}
