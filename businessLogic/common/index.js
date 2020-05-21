import {
  SELLING_FORMAT_MEDITION_PLURAL,
  SELLING_FORMAT_MEDITION_SINGULAR
} from '../constants'

export default class UnidMedition {
  static getMeditionUnitQuantity(steps, quantity) {
    return quantity > 1
      ? SELLING_FORMAT_MEDITION_PLURAL[steps[0].selling_format]
      : SELLING_FORMAT_MEDITION_SINGULAR[steps[0].selling_format]
  }
}
