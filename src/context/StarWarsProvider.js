import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
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
    setData(allData.filter(
      (element) => element.name.toLowerCase().includes(filterTitle),
    ));
  }, [filterTitle]);
  const handleTitleFilter = ({ target }) => setFilterTitle(target.value);

  const contextValue = {
    data,
    setData,
    handleTitleFilter,
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
