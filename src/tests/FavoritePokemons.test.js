import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../pages';
import renderWithRouter from './renderWithRouter';

test('se é exibida na tela a mensagem No favorite pokemon found', () => {
  renderWithRouter(<FavoritePokemons />);

  const noFav = screen.getByText(/no favorite pokemon found/i);
  expect(noFav).toBeInTheDocument();
});
