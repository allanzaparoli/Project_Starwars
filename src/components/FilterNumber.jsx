import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import StarWarsContext from '../context/StarWarsContext';

export default function FilterNumber() {
  const {
    handleFilterNumber, filterOperator, setFilterOperator, filterColumn,
    setFilterColumn, setFilterNumeric, filterNumeric, optionColumn,
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
            {optionColumn.map((element) => (
              <option key={ uuidv4 }>
                {element}
              </option>
            ))}
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
