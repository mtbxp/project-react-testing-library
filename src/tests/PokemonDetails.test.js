import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Test Pokemon Details', () => {
  const moreDetailsText = 'More details';
  test('Se as informações detalhadas do pokémon selecionado são mostradas na tela.',
    () => {
      renderWithRouter(<App />);
      const { name, summary } = pokemons[0];
      const moreDetails = screen.getByRole('link', {
        name: moreDetailsText });
      userEvent.click(moreDetails);
      const details = screen.getByRole('heading', {
        name: `${name} Details` });
      expect(details).toBeInTheDocument();
      expect(moreDetails).not.toBeInTheDocument();
      const summaryScreen = screen.getByRole('heading', {
        name: 'Summary', level: 2 });
      expect(summaryScreen).toBeInTheDocument();
      const summaryText = screen.getByText(`${summary}`);
      expect(summaryText).toBeInTheDocument();
    });

  test('Se existe na página uma seção com os mapas contendo as localizações do pokémon.',
    () => {
      renderWithRouter(<App />);
      const { name, foundAt } = pokemons[0];
      const map1 = foundAt[0].map;
      const map2 = foundAt[1].map;
      const moreDetails = screen.getByRole('link', { name: moreDetailsText });
      userEvent.click(moreDetails);
      const gameLocationsText = screen.getByRole('heading', {
        name: `Game Locations of ${name}` });
      expect(gameLocationsText).toBeInTheDocument();
      const gameLocation1 = screen.getByText(`${foundAt[0].location}`);
      expect(gameLocation1).toBeInTheDocument();
      const gameLocation2 = screen.getByText(`${foundAt[1].location}`);
      expect(gameLocation2).toBeInTheDocument();
      const img = screen.getAllByRole('img', {
        name: `${name} location` });
      expect(img[0]).toHaveAttribute('src', map1);
      expect(img[0]).toHaveAttribute('alt', `${name} location`);
      expect(img[1]).toHaveAttribute('src', map2);
      expect(img[1]).toHaveAttribute('alt', `${name} location`);
    });

  test('Se as informações detalhadas do pokémon selecionado são mostradas na tela.',
    () => {
      renderWithRouter(<App />);
      const { name } = pokemons[0];
      const moreDetails = screen.getByRole('link', { name: moreDetailsText });
      userEvent.click(moreDetails);
      const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
      expect(checkbox).toBeInTheDocument();
      const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
      expect(checkboxLabel).toBeDefined();
      userEvent.click(checkbox);
      const fav = screen.getByRole('img', { name: `${name} is marked as favorite` });
      expect(fav).toBeInTheDocument();
      userEvent.click(checkbox);
      expect(fav).not.toBeInTheDocument();
    });
});
