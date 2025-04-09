
// When creating product objects, ensure we don't add properties not in the interface:
// Instead of:
// const productWithQuantity = {
//   ...product,
//   quantity: 1 // This causes the TS error
// };

// Do this:
const handleAddToCart = () => {
  // Clone the product and handle the quantity separately
  const productToAdd = {
    ...product
  };
  // Then handle quantity in the cart logic without modifying the Product object
  addToCart(productToAdd, 1); // Where the second parameter represents quantity
};

// Or update your addToCart function to accept quantity as a second parameter
