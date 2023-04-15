import React from 'react';
import '../style/LoadingPage.css' 

const LoadingPage = () => {
  return (
    <div className="not-found">
      <h1>Loading...</h1>
      <p>Waiting for MetaMask...</p>
    </div>
  );
}

export default LoadingPage;