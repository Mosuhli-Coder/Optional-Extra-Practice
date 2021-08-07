import React  from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import OrderEntry from './OrderEntry';
import ScoopOption from './ScoopOption';

test('Confirm that page Loads', async () => {
  render(<App />);  
  fireEvent.click(screen.getByText('Load'))
  // Wait for page to update with query text
  const items = await screen.findByTitle("My App")
  expect(items).toBeInTheDocument();

  const thankYou = await screen.findByRole('Heading', {
    name: /Thank You/i,
  });
  expect(thankYou).toBeInTheDocument();

  // expect that loading diappear 

  const disappear = screen.queryByText('loading');
  expect(disappear).not.toBeInTheDocument();

});

test('add toppings', async () => {
  render(<App />);

  const vanilla = await screen.findByRole('spinbutton', { name:'Vanilla'  });
  userEvent.clear(vanilla);
  userEvent.type(vanilla, '1');

  const chocolate = screen.getByRole('spinbutton', {name: 'Chocolate'});
  userEvent.clear(chocolate);
  userEvent.type(chocolate, '2');

  const cherries = await screen.findByRole('checkbox', { name: 'Cherries'});
  userEvent.click(cherries);
 
});

test('Disable order button if there are no scoops ordered', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()}/>);

  let orderButton = screen.getByRole('button', {name: 'order sundae'});
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla'});
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(orderButton).toBeEnabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();

});

test.only('indecate if scoop count is non-int or out of range', async () => {
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

  const vanillaInput = screen.getByRole('spinbutton');
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '3');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});



function vanillaInput(vanillaInput: any) {
  throw new Error('Function not implemented.');
}
