import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterOperator, setFilterOperator] = useState('maior que');
  const [filterNumeric, setFilterNumeric] = useState('0');
  const [optionColumn, setOptionColumn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  useEffect(() => {
    const fetchApi = async () => {
      const api = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(api).then((response) => response.json());
      results.forEach((element) => delete element.residents);
      setData(results);
      setAllData(results);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const dataAll = allData.filter(
      (element) => element.name.toLowerCase().includes(filterByName),
    );
    setData(dataAll);
  }, [filterByName]);

  const handleTitleFilter = ({ target }) => setFilterByName(target.value.toLowerCase());

  const handleFilterNumber = () => {
    const newFilterByNumericValues = {
      column: filterColumn,
      comparison: filterOperator,
      value: filterNumeric,
    };
    const removeColumns = optionColumn.filter((element) => element !== filterColumn);
    setOptionColumn(removeColumns);
    setFilterByNumericValues(newFilterByNumericValues);
    setData(allData.filter((element) => element[filterColumn] > 1));

    const justOneColumn = filterColumn;
    console.log(justOneColumn);

    switch (filterOperator) {
    case 'maior que':
      return setData(data
        .filter((element) => +element[filterColumn] > Number(filterNumeric)));
    case 'menor que':
      return setData(data
        .filter((element) => +element[filterColumn] < Number(filterNumeric)));
    case 'igual a':
      return setData(data
        .filter((element) => +element[filterColumn] === Number(filterNumeric)));
    default:
      return setData(allData);
    }
  };

  const contextValue = {
    data,
    setData,
    handleTitleFilter,
    handleFilterNumber,
    filterColumn,
    setFilterColumn,
    filterOperator,
    setFilterOperator,
    filterNumeric,
    setFilterNumeric,
    filterByNumericValues,
    setFilterByNumericValues,
    optionColumn,
    setOptionColumn,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}
StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
