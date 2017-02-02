import { Injectable } from '@angular/core';

import { Enum } from './enumify';

export class DomainType extends Enum {
  static BUYER: DomainType;
  static MANUFACTURER: DomainType;
}

DomainType.initEnum([
  'BUYER', 'MANUFACTURER'
]);

@Injectable()
export class Domain {
  static TYPE: DomainType = null;

  defineType(type: string | DomainType) {
    let domain: DomainType;

    if (type instanceof String) {
      domain = type.toLowerCase() === 'buyer' ? DomainType.BUYER : DomainType.MANUFACTURER;
    }

    Domain.TYPE = domain ? domain : <DomainType>type;
  }
}
