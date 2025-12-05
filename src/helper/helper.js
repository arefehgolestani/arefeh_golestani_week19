const generateProductCode = () => {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `PRD-${random}`;
};

export { generateProductCode };
