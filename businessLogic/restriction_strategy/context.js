import MaxQuantityStrategy from './maxQuantityStrategy'

const RESTRICTIONS_STRATEGY_MAP = {
  restrictionMaxQuantityMap: MaxQuantityStrategy
}

// Refactorizar para hacerlo escalable
export default class ContextRestrictionStrategy {
  strategiesClassList = []

  constructor(restrictionsMap = {}) {
    this.restrictionsMap = restrictionsMap
    const restrictionsKeysList = Object.keys(restrictionsMap)
    for (const restrictionKey of restrictionsKeysList) {
      const StrategyClass = RESTRICTIONS_STRATEGY_MAP[restrictionKey]
      if (RESTRICTIONS_STRATEGY_MAP[restrictionKey]) {
        const strategyClass = new StrategyClass(restrictionsMap[restrictionKey])
        this.strategiesClassList.push(strategyClass)
      }
    }
  }

  isValid(product, quantity) {
    let valid = true
    for (const strategiesClass of this.strategiesClassList) {
      if (!strategiesClass.isValid(product, quantity)) {
        valid = false
      }
    }
    return valid
  }

  getInvalidMessage(product, quantity) {
    const messages = []
    for (const strategiesClass of this.strategiesClassList) {
      const errorObject = strategiesClass.getInvalidMessage(product, quantity)
      if (errorObject) {
        messages.push(errorObject)
      }
    }
    return messages
  }
}
