import assert from 'assert';
import { isNumberString, length } from 'class-validator';

export class Pin {
  private readonly identifier: string;

  private constructor(identifier: string) {
    this.identifier = identifier;
  }

  static new(identifier: string): Pin {
    if (length(identifier, 6, 6) && isNumberString(identifier)) {
      return new Pin(identifier);
    }

    throw new Error('invalid pin identifier');
  }

  public toString() {
    return this.identifier;
  }
}
