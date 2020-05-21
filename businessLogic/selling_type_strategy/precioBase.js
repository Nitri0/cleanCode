import {
  PRECIO_BASE,
  SELLING_FORMAT_MEDITION_DIMINUTIVE,
  SELLING_FORMAT_MEDITION_PLURAL
} from '../constants'
import common from './commonDataStructure'

export default class PrecioBase {
  constructor(product) {
    // maximo 1 step
    this.steps = product.steps
    this.product = product
  }

  getItemDetail() {
    const productDetail = common.getDataObject(this.product)
    productDetail.storeRetreat = this._getStoreRetreat(this.product)
    productDetail.sellingFormat.type = PRECIO_BASE
    productDetail.sellingFormat.precioBaseDetail = this._getPriceDetail(
      this.steps
    )
    productDetail.sellingFormat.minimumQuantity = this.steps[0].q_min
    productDetail.message1 = this._getMessage(this.steps)
    productDetail.message2 = this._getMessage(this.steps)
    return productDetail
  }

  _getMessage(steps) {
    if (steps[0].q_min > 1) {
      const unitOfMeasurement =
        SELLING_FORMAT_MEDITION_PLURAL[steps[0].selling_format]
      return `Mínimo requerido: ${steps[0].q_min} ${unitOfMeasurement}`
    }
    return ''
  }

  _getPriceDetail(steps) {
    return {
      unitPrice: parseInt(steps[0].final_pvp, 0)
        .toLocaleString()
        .replace(/,/g, '.'),
      unitOfMeasurement:
        SELLING_FORMAT_MEDITION_DIMINUTIVE[steps[0].selling_format]
    }
  }

  _getStoreRetreat() {
    // bussiness logic for store retreat
    return false
  }

  calculatePrice(quantity) {
    this.quantity = quantity
    const objectResult = {
      valid: false,
      price: null,
      sellingTypeMessage: '',
      errorMessages: []
    }
    if (!this._isValidQuantity(this.steps, this.quantity)) {
      objectResult.errorMessages = this._getInvalidMessages(
        this.steps,
        this.quantity
      )
      return objectResult
    }
    objectResult.valid = true
    objectResult.price = this.steps[0].final_pvp * this.quantity
    return objectResult
  }

  // business logic validation
  _isValidQuantity(steps, quantity) {
    let valid = true
    if (quantity === 0) {
      valid = false
    }
    return valid
  }

  _getInvalidMessages(steps, quantity) {
    const errors = []
    if (quantity === 0) {
      errors.push('Cantidad invalida')
    }
    return errors
  }
}
