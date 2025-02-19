import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data'
import Product from './Product'
import axios from 'axios';
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterproducts, setFilterProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get(cat ?
        `https://e-ecommerce.onrender.com/api/products?category=${cat}`
        : "https://e-ecommerce.onrender.com/api/products");
      console.log(res);
      setProducts(res.data);
      console.log("Data get sucessfully");
    } catch (error) {
      console.log("Data is not fetched", error);
    }
  }
  useEffect(() => {
    getProducts()
  }, [cat]);
  useEffect(() => {
    cat && setFilterProducts(
      products.filter((item) => Object.entries(filters).every(([key, value]) =>
        item[key].includes(value)))
    );
  }, [products, cat, filters]);
  useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt));
    }
    if (sort === "asc") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price));
    }
    else {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);
  return (
    <Container>
      {cat ? filterproducts.length > 0 && filterproducts.map(item => (
        <Product item={item} key={item.id} />
      )) : (
        products.length > 0 &&
        products.slice(0, 16).map(item => (
          <Product item={item} key={item.id} />
        ))
      )}
    </Container>
  )

}

export default Products
