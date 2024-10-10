import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      fetchProducts(); // Atualiza a lista de produtos após exclusão
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ProductForm fetchProducts={fetchProducts} selectedProduct={selectedProduct} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} - {product.quantity}
            <button onClick={() => handleEdit(product)}>Editar</button>
            <button onClick={() => handleDelete(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
