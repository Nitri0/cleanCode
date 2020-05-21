import { REBAJA, SELLING_FORMAT_MEDITION_DIMINUTIVE } from '../constants'
import common from './commonDataStructure'
import { SELLING_FORMAT_MEDITION_PLURAL } from '~/businessLogic/constants'

export default class Rebaja {
  constructor(product) {
    this.steps = product.steps
    this.product = product
  }

  getItemDetail() {
    const productDetail = common.getDataObject(this.product)
    productDetail.storeRetreat = this._getStoreRetreat(this.product)
    productDetail.sellingFormat.type = REBAJA
    productDetail.sellingFormat.rebajaDetail = this._getPriceDetail(this.steps)
    productDetail.sellingFormat.minimumQuantity = this.steps[0].q_min
    productDetail.message2 = this._getMessage(this.steps)

    return productDetail
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

  _getStoreRetreat(product) {
    return false
  }

  _getMessage(steps) {
    if (steps[0].q_min > 1) {
      const unitOfMeasurement =
        SELLING_FORMAT_MEDITION_PLURAL[steps[0].selling_format]
      return `Mínimo requerido: ${steps[0].q_min} ${unitOfMeasurement}`
    }
    return ''
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
    if (quantity === 0 || steps[0].q_min > quantity) {
      valid = false
    }
    return valid
  }

  _getInvalidMessages(steps, quantity) {
    const errors = []
    if (quantity === 0) {
      errors.push('Cantidad invalida')
    } else if (steps[0].q_min > quantity) {
      errors.push(`Cantidad minima ${steps[0].q_min}`)
    }
    return errors
  }
}
