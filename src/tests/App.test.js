import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando a aplicação', () => {
  beforeEach(() => {
    renderWithRouter(<App />)
  });

  test('Testar os inputs', () => {

    const inputsColuna = screen.getByLabelText('Coluna');
    const inputsOperador = screen.getByLabelText('Operador');
    
    expect(inputsColuna).toBeInTheDocument();
    expect(inputsOperador).toBeInTheDocument();
  });

  test("Verificar se existe um botão", () => {
    const button = screen.getByRole("button");
    // fazer os testes
    // expect(buttons).toHaveLength(2); >> Quando quer verificar se dois ou mais botões existem.
    expect(button).toBeInTheDocument();
  });

  test("Verificar se existe um botão de enviar", () => {
    // Acessar os elementos da tela
    const button = screen.getByTestId("button-filter");
  
    // fazer os testes
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toBe("Pesquisar");
  });
  
  test("Verificar se os valores 'population, maior que' iniciam a página", () => {
      const valueColumn = screen.getByTestId("column-filter");
      expect(valueColumn).toHaveValue('population');
  });

});

const mockApiReturn = {
  results: [
    {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      films: [
        'https://swapi-trybe.herokuapp.com/api/films/1/',
        'https://swapi-trybe.herokuapp.com/api/films/3/',
        'https://swapi-trybe.herokuapp.com/api/films/4/',
        'https://swapi-trybe.herokuapp.com/api/films/5/',
        'https://swapi-trybe.herokuapp.com/api/films/6/',
      ],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.411000Z',
      url: 'https://swapi-trybe.herokuapp.com/api/planets/1/',
    },
  ],
};

describe('Testando a API', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockApiReturn),
    });
    renderWithRouter(<App />);
  });

  it('Testa se a mensagem de boas-vindas está renderizada', async () => {
    const helloText = await screen.findByText('Hello, App!');
    expect(helloText).toBeInTheDocument();
  });
  it('Testa se o planeta Tatooine está sendo renderizado', async () => {
    const planet = await screen.findByText('Tatooine');
    expect(planet).toBeInTheDocument();
  });
  it('Testa se o mock está retornando normalmente', async () => {
    const planet = await screen.findByText('Tatooine');
    expect(planet).toBeInTheDocument();
  });
  it('Testa se a API está sendo chamada', async () => {
    // expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledTimes(1);
  });
  describe('Testando a busca', () => {
    it('Testa se apenas os planetas filtrados estão renderizados', async () => {
      const input = await screen.findByPlaceholderText('Pesquisar');
      userEvent.type(input, 'oo');
      const planet = await screen.findByText('Tatooine');
      expect(planet).toBeInTheDocument();
      userEvent.type(input, 'z');
      expect(planet).not.toBeInTheDocument();
    });
  });
  describe('Testa se os filtros estão funcionando', () => {

    it('Testa o filtro numérico', async () => {
      const findButton = await screen.findByTestId('button-filter');
      userEvent.click(findButton);
      const planet = await screen.findByText('Tatooine');
      expect(planet).toBeInTheDocument();
      const findValue = await screen.findByTestId('value-filter');
      userEvent.type(findValue, '200000');
      expect(planet).not.toBeInTheDocument();
    });

    it('Testa o filtro de coluna', async () => {
      const columnFilter = await screen.findByTestId('column-filter');
      userEvent.selectOptions(columnFilter, 'orbital_period');
      const findButton = await screen.findByTestId('button-filter');
      userEvent.click(findButton);
      const planet = await screen.findByText('Tatooine');
      expect(planet).toBeInTheDocument();
      const findValue = await screen.findByTestId('value-filter');
      userEvent.type(findValue, '304');
      expect(planet).not.toBeInTheDocument();
    });

    it('Testa o filtro de operador IGUAL A', async () => {
      const compartionFilter = await screen.findByTestId('comparison-filter');
      userEvent.selectOptions(compartionFilter, 'igual a');
      const findValue = await screen.findByTestId('value-filter');
      userEvent.type(findValue, '200000');
      const findButton = await screen.findByTestId('button-filter');
      userEvent.click(findButton);
      const planet = await screen.findByText('Tatooine');
      expect(planet).toBeInTheDocument();
    });
    it('Testa o filtro de operador MENOR QUE', async () => {
      const compartionFilter = await screen.findByTestId('comparison-filter');
      userEvent.selectOptions(compartionFilter, 'menor que');
      const findValue = await screen.findByTestId('value-filter');
      userEvent.type(findValue, '1000000');
      const findButton = await screen.findByTestId('button-filter');
      userEvent.click(findButton);
      const planet = await screen.findByText('Tatooine');
      expect(planet).toBeInTheDocument();
    });
    it('Testa o filtro de operador MAIOR QUE', async () => {
      const compartionFilter = await screen.findByTestId('comparison-filter');
      userEvent.selectOptions(compartionFilter, 'maior que');
      const findValue = await screen.findByTestId('value-filter');
      userEvent.type(findValue, '1');
      const findButton = await screen.findByTestId('button-filter');
      userEvent.click(findButton);
      const planet = await screen.findByText('Tatooine');
      expect(planet).toBeInTheDocument();
    });
  });
});
