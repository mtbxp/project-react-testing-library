import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  renderWithRouter(<App />);

  const home = screen.getByRole('link', { name: /home/i });
  expect(home).toBeInTheDocument();

  const about = screen.getByRole('link', { name: /about/i });
  expect(about).toBeInTheDocument();

  const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
  expect(favorite).toBeInTheDocument();
});

test('se redireciona para a pagina Not Found quando não for uma URL válida', () => {
  const { history } = renderWithRouter(<App />);
  history.push('./qualquercoisa');

  const notFound = screen.getByText(/not found/i);
  expect(notFound).toBeInTheDocument();
});
