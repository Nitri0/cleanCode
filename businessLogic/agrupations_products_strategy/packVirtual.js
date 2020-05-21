export default class PackVirtual {
  static modificator(steps, finalPvp = 0) {
    if (steps[0].sell_type === 3) {
      return (
        parseInt(finalPvp, 10) * parseInt(steps[0].units_per_selling_format, 10)
      )
    }
    return finalPvp
  }
}
