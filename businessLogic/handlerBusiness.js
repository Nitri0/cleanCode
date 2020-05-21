import UnidMedition from './common'
import ContextSellingType from './selling_type_strategy/context'
import ContextAgrupationsProducts from './agrupations_products_strategy/context'
import ContextRestrictionStrategy from './restriction_strategy/context'

export default class HandlerBusiness {
  constructor(params = {}) {
    const { restrictionMaxQuantityMap = {} } = params
    this.restrictionMaxQuantityMap = restrictionMaxQuantityMap
  }

  getMinimunProductQuantity(product) {
    return product.steps[0].q_min
  }

  calculatePrice(product, quantity) {
    // Validacion de restricciones
    const contextRestrictionStrategy = new ContextRestrictionStrategy({
      restrictionMaxQuantityMap: this.restrictionMaxQuantityMap
    })

    if (!contextRestrictionStrategy.isValid(product, quantity)) {
      return {
        valid: false,
        price: null,
        sellingTypeMessage: '',
        errorMessages: contextRestrictionStrategy.getInvalidMessage(
          product,
          quantity
        )
      }
    }

    // Calculo precio segun el tipo de venta
    const contextSellingType = new ContextSellingType(product)
    const priceObject = contextSellingType.calculatePrice(quantity)

    if (!priceObject.valid) {
      return priceObject
    }

    // Calculo agrupaciones de productos
    const contextAgrupationsProducts = new ContextAgrupationsProducts(product)
    priceObject.price = contextAgrupationsProducts.modificatorPvP(
      priceObject.price
    )
    return priceObject
  }

  getMeditionUnitQuantity(product, quantity) {
    return UnidMedition.getMeditionUnitQuantity(product.steps, quantity)
  }

  getItemDetail(product) {
    const contextSellingType = new ContextSellingType(product)
    return contextSellingType.getItemDetail()
  }

  getItemsDetails(products) {
    return products.map((product) => {
      const contextSellingType = new ContextSellingType(product)
      return contextSellingType.getItemDetail()
    })
  }
}
