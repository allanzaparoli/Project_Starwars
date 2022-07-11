import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function FilterName() {
  const {
    handleFilterNumber, filterOperator, setFilterOperator, filterColumn,
    setFilterColumn, setFilterNumeric, filterNumber,
  } = useContext(StarWarsContext);
  return (
    <form>
      <label htmlFor="filterColumn">
        Coluna
        <select
          value={ filterColumn }
          id="filterColumn"
          onChange={ ({ target }) => setFilterColumn(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diamenter">diamenter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="filterOperator">
        Operador
        <select
          value={ filterOperator }
          id="filterOperator"
          onChange={ ({ target }) => setFilterOperator(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="filterNumber">
        <input
          value={ filterNumber }
          type="number"
          placeholder="0"
          onChange={ ({ target }) => setFilterNumeric(target.value) }
        />
      </label>
      <button type="button" onClick={ handleFilterNumber }>Pesquisar</button>
    </form>
  );
}
