import { Validate } from 'class-validator';
import { PinValidator } from '@app/lib/class-validator/pin-validator';

export class PinDTO {
  @Validate(PinValidator)
  pin: string;
}
