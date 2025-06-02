const axios = require('axios');
const API_URL = 'https://fakestoreapi.com/products';

describe('FakeStore API - Product Data Validation', () => {
  let products = [];

  beforeAll(async () => {
    const response = await axios.get(API_URL);
    expect(response.status).toBe(200);
    products = response.data;
  });

  test('Each product should have a non-empty title', () => {
    const defective = products.filter(p => !p.title || p.title.trim() === '');
    if (defective.length > 0) {
      console.log('❌ Products with missing or empty title:', defective.map(p => p.id));
    }
    expect(defective.length).toBe(0);
  });

  test('Each product should have a non-negative price', () => {
    const defective = products.filter(p => typeof p.price !== 'number' || p.price < 0);
    if (defective.length > 0) {
      console.log('❌ Products with invalid price:', defective.map(p => p.id));
    }
    expect(defective.length).toBe(0);
  });

  test('Each product rating.rate should not exceed 5', () => {
    const defective = products.filter(p => p.rating?.rate > 5);
    if (defective.length > 0) {
      console.log('❌ Products with rating.rate > 5:', defective.map(p => p.id));
    }
    expect(defective.length).toBe(0);
  });
});
