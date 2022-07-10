import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function FilterName() {
  const { handleTitleFilter } = useContext(StarWarsContext);
  return (
    <form>
      <input type="text" placeholder="Pesquisar" onChange={ handleTitleFilter } />
      <label htmlFor="filterColumn">
        Coluna
        <select id="filterColumn">
          <option>population</option>
          <option>orbital_period</option>
          <option>diamenter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="filterOperator">
        Operador
        <select id="filterOperator">
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <input type="number" placeholder="0" />
      <button type="button">Pesquisar</button>
    </form>
  );
}
