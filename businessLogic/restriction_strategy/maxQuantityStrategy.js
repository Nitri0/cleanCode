export default class MaxQuantityStrategy {
  constructor(restrictionMaxQuantityMap) {
    this.restrictionMaxQuantityMap = restrictionMaxQuantityMap
  }

  isValid(product, quantity) {
    try {
      const restriction = this.restrictionMaxQuantityMap[product.store_id][
        product.item_nbr
      ]
      return parseInt(restriction.max_quantity, 10) >= parseInt(quantity, 10)
    } catch (e) {
      return true
    }
  }

  getInvalidMessage(product, quantity) {
    try {
      let error = null
      const restriction = this.restrictionMaxQuantityMap[product.store_id][
        product.item_nbr
      ]
      if (parseInt(restriction.max_quantity, 10) < parseInt(quantity, 10)) {
        error = `Maxima cantidad permitida ${restriction.max_quantity}`
      }
      return error
    } catch (e) {
      return null
    }
  }
}
