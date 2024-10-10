import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ fetchProducts, selectedProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // UseEffect para atualizar o formulário quando selectedProduct mudar
  useEffect(() => {
    if (selectedProduct && Object.keys(selectedProduct).length > 0) {
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price);
      setQuantity(selectedProduct.quantity);
    } else {
      // Limpar o formulário se não houver produto selecionado
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
    }
  }, [selectedProduct]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { name, description, price, quantity };

    try {
      if (selectedProduct && selectedProduct.id) {
        // Editar produto existente
        await axios.put(`http://localhost:3000/api/products/${selectedProduct.id}`, product);
      } else {
        // Adicionar novo produto
        await axios.post('http://localhost:3000/api/products', product);
      }

      // Limpar formulário após submissão
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');

      // Atualizar lista de produtos
      fetchProducts();
    } catch (error) {
      console.error('Erro ao adicionar ou editar produto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do produto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição do produto"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button type="submit">{selectedProduct ? 'Editar Produto' : 'Adicionar Produto'}</button>
    </form>
  );
};

export default ProductForm;
