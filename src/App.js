import React from 'react';
import Dashboard from './pages/dashboard';
import ProductContextProvider from './contexts/ProductContext.js';

function App() {

  return (
    <div>
      <ProductContextProvider>
        <Dashboard/>
      </ProductContextProvider>
     
    </div>
  );
}

export default App;
