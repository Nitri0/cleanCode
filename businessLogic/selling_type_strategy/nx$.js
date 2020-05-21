import { Nx$, SELLING_FORMAT_MEDITION_DIMINUTIVE } from '../constants'
import common from './commonDataStructure'

export default class Nx {
  constructor(product) {
    // debe tener 2 steps
    this.steps = product.steps
    this.product = product
  }

  // calculo de la medicion de precios (steps) de la promocion
  _getPriceDetail(steps) {
    return {
      factorMultiplier: 5,
      promotionPrice: parseInt(steps[1].final_pvp, 0)
        .toLocaleString()
        .replace(/,/g, '.'),
      unitPrice: parseInt(steps[0].final_pvp, 0)
        .toLocaleString()
        .replace(/,/g, '.'),
      unitOfMeasurement:
        SELLING_FORMAT_MEDITION_DIMINUTIVE[steps[1].selling_format]
    }
  }

  // calculo el retiro en tienda segun modelo de negocio
  _getStoreRetreat(product) {
    // bussiness logic for store retreat
    return false
  }

  getItemDetail = () => {
    const productDetail = common.getDataObject(this.product)
    productDetail.storeRetreat = this._getStoreRetreat(this.product)
    productDetail.sellingFormat.type = Nx$
    productDetail.sellingFormat.nx$Detail = this._getPriceDetail(this.steps)
    productDetail.sellingFormat.minimumQuantity = this.steps[0].q_min
    return productDetail
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
    const minRangeQuantityPromo = this.steps[1].q_min
    const quantityProductsOutPromo = this.quantity % minRangeQuantityPromo
    const quantityProductsInPromo = this.quantity - quantityProductsOutPromo
    const quantityPromos = parseInt(this.quantity / minRangeQuantityPromo, 10)
    const priceProductOutPromo =
      this.steps[0].final_pvp * quantityProductsOutPromo
    const priceProductInPromo =
      quantityProductsInPromo > 0 ? this.steps[1].final_pvp * quantityPromos : 0
    const price = priceProductInPromo + priceProductOutPromo

    objectResult.valid = true
    objectResult.errorMessages = []
    objectResult.price = price
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
