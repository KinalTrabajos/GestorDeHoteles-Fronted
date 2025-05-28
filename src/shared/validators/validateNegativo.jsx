export const validateNegativo = (priceService) => {
  return Number(priceService) >= 1
};

export const negativoValidationMessage = 'El precio no puede ser negativo';
