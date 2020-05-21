import PackReal from './agrupations_products_strategy/packReal'
import PackVirtual from './agrupations_products_strategy/packVirtual'
import Unitario from './agrupations_products_strategy/unitario'

// Definimos un mapa de Estrategias para las promociones
export const MODIFICATORS_CLASS_ITERATOR = [Unitario, PackReal, PackVirtual]
