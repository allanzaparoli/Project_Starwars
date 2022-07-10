import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';

export default function App() {
  return (
    <div>
      <span>Hello, App!</span>
      <StarWarsProvider>
        <Table />
      </StarWarsProvider>
    </div>
  );
}
