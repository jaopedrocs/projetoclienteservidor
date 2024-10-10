import ProductList from './components/ProductList';
import './App.css';
import lojaImage from './assets/loja.jpg'; // Certifique-se de adicionar uma imagem nessa pasta

function App() {
  return (
    <div className="container">
      <header>
        {/* Adicionar a imagem da loja */}
        <img src={lojaImage} alt="Lojinha da Sandrinha" className="loja-image" />
        <h1>Lojinha da Sandrinha</h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
