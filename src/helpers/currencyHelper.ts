function formatCurrency(price: number) {
  const formattedPrice = price.toString()
  return `$${
    formattedPrice.substring(0, formattedPrice.length - 2) +
    '.' +
    formattedPrice.substring(formattedPrice.length - 2)
  }`
}

export default formatCurrency
