import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

test('se é renderizado um card com as informações de determinado pokémon', () => {
  renderWithRouter(<App />);
  const pokemon = pokemons[0];
  const { name, image } = pokemon;
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(name);
  expect(pokemonName).toBeInTheDocument();

  const type = screen.getByTestId('pokemon-type');
  expect(type).toHaveTextContent(pokemon.type);
  expect(type).toBeInTheDocument();

  const { averageWeight: { value, measurementUnit } } = pokemon;
  const weight = screen.getByTestId('pokemon-weight');
  expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  expect(weight).toBeInTheDocument();

  const img = screen.getByRole('img', {
    name: `${name} sprite` });
  expect(img).toHaveAttribute('src', image);
  expect(img).toHaveAttribute('alt', `${name} sprite`);
});

test('se o card do pokémon indicado na Pokédex contém um link de navegação de detalhes',
  () => {
    renderWithRouter(<App />);
    const { id } = pokemons[0];

    const details = screen.getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    expect(details).toHaveAttribute('href', `/pokemons/${id}`);
  });

test('se existe um ícone de estrela nos pokémons favoritados', () => {
  renderWithRouter(<App />);
  const { name } = pokemons[0];

  const details = screen.getByRole('link', { name: 'More details' });
  userEvent.click(details);

  const check = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
  userEvent.click(check);

  const fav = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(fav);

  const starImg = screen.getByRole('img', {
    name: `${name} is marked as favorite` });

  expect(starImg).toHaveAttribute('src', '/star-icon.svg');
  expect(starImg).toHaveAttribute('alt', `${name} is marked as favorite`);
});
