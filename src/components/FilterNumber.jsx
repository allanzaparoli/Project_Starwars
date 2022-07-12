import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function FilterNumber() {
  const {
    handleFilterNumber, filterOperator, setFilterOperator, filterColumn,
    setFilterColumn, setFilterNumeric, filterNumeric,
  } = useContext(StarWarsContext);

  return (
    <div>
      <form>
        <label htmlFor="filterColumn">
          Coluna
          <select
            value={ filterColumn }
            id="filterColumn"
            onChange={ ({ target }) => setFilterColumn(target.value) }
            data-testid="column-filter"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
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
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="filterNumber">
          <input
            value={ filterNumeric }
            type="number"
            placeholder="0"
            onChange={ ({ target }) => setFilterNumeric(target.value) }
            data-testid="value-filter"
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleFilterNumber }
        >
          Pesquisar

        </button>
      </form>
    </div>
  );
}
