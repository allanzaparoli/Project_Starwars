import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';
import FilterName from './components/FilterName';
import FilterNumber from './components/FilterNumber';

export default function App() {
  return (
    <div>
      <span>Hello, App!</span>
      <StarWarsProvider>
        <FilterName />
        <FilterNumber />
        <Table />
      </StarWarsProvider>
    </div>
  );
}
