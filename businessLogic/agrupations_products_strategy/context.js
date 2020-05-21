import Unitario from './unitario'
import PackReal from './packReal'
import PackVirtual from './packVirtual'

const MODIFICATORS_STRATEGY_ITERATOR = [Unitario, PackReal, PackVirtual]

// devolver un objeto que segun el tipo de datos que agrupa a los productos
export default class ContextAgrupationsProducts {
  constructor(product) {
    this.product = product
  }

  // iterador de modificadores de precios (packs)
  modificatorPvP(finalPvp) {
    if (finalPvp) {
      let result = finalPvp
      for (const iteratorFunction of MODIFICATORS_STRATEGY_ITERATOR) {
        result = iteratorFunction.modificator(this.product.steps, result)
      }
      return result
    }
    return finalPvp
  }
}
