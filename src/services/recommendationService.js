// Sample product data (replace with your actual product data)
const products = [
  { id: 1, name: "Product 1", category: "Electronics" },
  { id: 2, name: "Product 2", category: "Clothing" },
  { id: 3, name: "Product 3", category: "Electronics" },
  // Add more products...
];

// Sample user interactions (replace with actual user interaction data)
const userInteractions = [
  { userId: 1, productId: 1, action: "view" },
  { userId: 2, productId: 1, action: "view" },
  { userId: 1, productId: 2, action: "purchase" },
  // Add more user interactions...
];

// Function to get popular products based on user interactions
const getPopularProducts = () => {
  // Count the number of interactions for each product
  const productCounts = {};
  userInteractions.forEach((interaction) => {
    const productId = interaction.productId;
    productCounts[productId] = (productCounts[productId] || 0) + 1;
  });

  // Sort products by interaction count (popularity)
  const popularProducts = products.sort((a, b) => {
    const countA = productCounts[a.id] || 0;
    const countB = productCounts[b.id] || 0;
    return countB - countA; // Descending order
  });

  return popularProducts;
};

module.exports = { getPopularProducts };
