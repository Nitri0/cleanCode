import PrecioBase from './precioBase'
import Nx from './nx$'
import Rebaja from './rebaja'
import CompraPorMenos from './compraMasPorMenos'

const FORMAT_TYPE_STRATEGY_MAP = {
  3: PrecioBase,
  5: Nx,
  2: Rebaja,
  1: CompraPorMenos
}

export default class ContextSellingType {
  constructor(product, quantity) {
    this.product = product
    this.quantity = quantity
    const Strategy = this._getStrategyClass(product)
    this.strategy = new Strategy(product)
  }

  _getStrategyClass(product) {
    return FORMAT_TYPE_STRATEGY_MAP[product.steps[0].promotion.type]
  }

  calculatePrice(quantity) {
    return this.strategy.calculatePrice(quantity)
  }

  getItemDetail() {
    return this.strategy.getItemDetail()
  }
}
