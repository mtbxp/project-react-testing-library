import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

test('se a página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);
  const encouteredPokemons = screen.getByRole('heading', {
    name: /encountered pokémons/i, level: 2 });
  expect(encouteredPokemons).toBeInTheDocument();
});

test('se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado',
  () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByText(/próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });

test('se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);
  const nextButton = screen.getByText(/próximo pokémon/i);
  const all = screen.getByText(/all/i);
  expect(all).toBeInTheDocument();

  userEvent.click(all);
  pokemons.forEach((pokemon) => {
    expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    userEvent.click(nextButton);
  });
});

test('se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const all = screen.getByRole('button', { name: 'All' });
  const pokemonType = screen.getByTestId('pokemon-type');
  const button = screen.getAllByTestId('pokemon-type-button');
  expect(button).toBeDefined();
  expect(all).toBeDefined();

  const fire = screen.getByRole('button', { name: /fire/i });
  userEvent.click(fire);
  expect(pokemonType).toHaveTextContent(/fire/i);

  const electric = screen.getByRole('button', { name: /electric/i });
  userEvent.click(electric);
  expect(pokemonType).toHaveTextContent(/electric/i);

  const bug = screen.getByRole('button', { name: /bug/i });
  userEvent.click(bug);
  expect(pokemonType).toHaveTextContent(/bug/i);

  const poison = screen.getByRole('button', { name: /poison/i });
  userEvent.click(poison);
  expect(pokemonType).toHaveTextContent(/poison/i);

  const psychic = screen.getByRole('button', { name: /psychic/i });
  userEvent.click(psychic);
  expect(pokemonType).toHaveTextContent(/psychic/i);

  const normal = screen.getByRole('button', { name: /normal/i });
  userEvent.click(normal);
  expect(pokemonType).toHaveTextContent(/normal/i);

  const dragon = screen.getByRole('button', { name: /dragon/i });
  userEvent.click(dragon);
  expect(pokemonType).toHaveTextContent(/dragon/i);
});
