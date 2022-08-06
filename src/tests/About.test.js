import { render, screen } from '@testing-library/react';
import React from 'react';
import { About } from '../pages';

test('se a página contém as informações sobre a Pokédex', () => {
  render(<About />);

  const firstText = screen.getByText(/this application simulates a Pokédex/i);
  expect(firstText).toBeInTheDocument();

  const secondText = screen.getByText(/One can filter Pokémons by type/i);
  expect(secondText).toBeInTheDocument();
});

test('se a página contém um heading h2 com o texto About Pokédex', () => {
  render(<About />);

  const h2 = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
  expect(h2).toBeInTheDocument();
});

// achei a solução aqui https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
test('se a página contém a seguinte imagem de uma Pokédex', () => {
  render(<About />);

  const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const img = screen.getByRole('img', { name: /pokédex/i });
  expect(img).toHaveAttribute('src', url);
});
