import Attribute from './attribute';
import Utils from '../models/utils';

/*
Public: An object that can be cast to `itemClass`
Section: Database
*/
export default class AttributeObject extends Attribute {
  constructor({modelKey, jsonKey, itemClass, queryable}) {
    super({modelKey, jsonKey, queryable});
    this.ItemClass = itemClass;
  }

  toJSON(val) {
    return (val && val.toJSON) ? val.toJSON() : val;
  }

  fromJSON(val) {
    if (!val || (this.ItemClass && val instanceof this.ItemClass)) {
      return val;
    }
    if (this.ItemClass) {
      return new this.ItemClass(val);
    }
    if (val.__cls) {
      return Utils.convertToModel(val);
    }
    return val;
  }
}
