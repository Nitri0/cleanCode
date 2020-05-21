import {
  COMPRA_POR_MENOS,
  SELLING_FORMAT_MEDITION_DIMINUTIVE,
  SELLING_FORMAT_MEDITION_DIMINUTIVE_PLURAL,
  SELLING_FORMAT_MEDITION_PLURAL
} from '../constants'
import common from './commonDataStructure'

export default class CompraMasPorMenos {
  constructor(product) {
    this.steps = product.steps
    this.product = product
  }

  getItemDetail() {
    const productDetail = common.getDataObject(this.product)
    productDetail.sellingFormat.type = COMPRA_POR_MENOS
    productDetail.storeRetreat = this._getStoreRetreat(this.product)
    productDetail.sellingFormat.compraMasPagaMenosDetail = this._getSteps(
      this.steps
    )
    productDetail.sellingFormat.minimumQuantity = this.steps[0].q_min
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

  _getSteps(steps) {
    return steps.map((step, index) => {
      const unitMedition =
        step.q_min <= 1
          ? SELLING_FORMAT_MEDITION_DIMINUTIVE[step.selling_format]
          : SELLING_FORMAT_MEDITION_DIMINUTIVE_PLURAL[step.selling_format]
      const highlighted = index === steps.length - 1
      return {
        descriptor: `Desde ${step.q_min} ${unitMedition}`,
        unitOfMeasurement:
          SELLING_FORMAT_MEDITION_DIMINUTIVE[step.selling_format],
        unitPrice: parseInt(step.final_pvp, 0)
          .toLocaleString()
          .replace(/,/g, '.'),
        highlighted
      }
    })
  }

  _getStoreRetreat() {
    return false
  }

  calculatePrice = (quantity) => {
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
    const rangesQuantitiesOfSteps = this.steps.map((step) => step.q_min)
    let indexOfStep = -1

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, range] of rangesQuantitiesOfSteps.entries()) {
      if (this.quantity < range) {
        indexOfStep = index - 1
        break
      }
      if (index === rangesQuantitiesOfSteps.length - 1) {
        indexOfStep = this.steps.length - 1
      }
    }

    objectResult.valid = true
    objectResult.price = this.steps[indexOfStep].final_pvp * this.quantity
    return objectResult
  }

  // business logic validation
  _isValidQuantity(steps, quantity) {
    let valid = true
    if (quantity === 0 || steps[0].q_min > quantity || steps.length < 2) {
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
