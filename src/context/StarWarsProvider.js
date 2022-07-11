import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterNumber, setFilterNumber] = useState([]);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterOperator, setFilterOperator] = useState('maior que');
  const [filterNumeric, setFilterNumeric] = useState('0');
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
      (element) => element.name.toLowerCase().includes(filterTitle),
    );
    setData(dataAll);
  }, [filterByName]);

  const handleTitleFilter = ({ target }) => setFilterByName(target.value.toLowerCase());

  const handleFilterNumber = () => {
    console.log(filterColumn);
    console.log(filterOperator);
    console.log(filterNumeric);
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
    filterNumber,
    setFilterNumber,
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
