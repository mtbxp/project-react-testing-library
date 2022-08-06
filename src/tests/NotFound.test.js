import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from './renderWithRouter';

test('se a página contém um heading h2 com o texto Page requested not found;', () => {
  renderWithRouter(<NotFound />);
  const notFound = screen.getByRole('heading', {
    name: /page requested not found crying emoji/i, level: 2 });
  expect(notFound).toBeInTheDocument();
});

test('se a página contém a seguinte imagem de uma Pokédex', () => {
  renderWithRouter(<NotFound />);
  const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const img = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i });
  expect(img).toHaveAttribute('src', url);
});
