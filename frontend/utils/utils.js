/**
 * Calculates the difference and saving percentage between buy and sell prices.
 * @param {number} buyPrice - The buy price.
 * @param {number} sellPrice - The sell price.
 * @returns {Object} An object containing the difference and saving percentage.
 */
 export function calculateDifferenceAndSaving(buyPrice, sellPrice) {
 

  const difference = sellPrice - buyPrice;
  

  return difference.toFixed(2)
}

