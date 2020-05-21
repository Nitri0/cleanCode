export default class PackReal {
  static modificator(steps, finalPvp) {
    if (steps[0].sell_type === 2) {
      return (
        parseInt(finalPvp, 10) / parseInt(steps[0].units_per_selling_format, 10)
      )
    }
    return finalPvp
  }
}
