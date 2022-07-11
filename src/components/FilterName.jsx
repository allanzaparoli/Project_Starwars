import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function FilterName() {
  const { handleTitleFilter } = useContext(StarWarsContext);
  return (
    <form>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Pesquisar"
        onChange={ handleTitleFilter }
      />
    </form>
  );
}
