/**
 * Formats a numeric value into a USD currency string with no decimals (e.g. $580).
 * @param {number} value - The numeric value to format.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Formats a numeric value into a USD currency string with exactly two decimal places (e.g. $4,250.00).
 * @param {number} value - The numeric value to format.
 * @returns {string} The formatted currency string.
 */
export const formatBalance = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};
