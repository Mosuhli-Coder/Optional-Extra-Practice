/* import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';*/
import app from './App';

//import request from 'supertest';
import { global } from 'yargs';

const request = require("supertest");



describe('test App', () => {
  beforeEach(async () => {
    const server = await app.listen(40000);
    global.agent = request.agent(server);
  });
  afterEach(async () => {
    await server.close();
  });
  describe('ice cream flavors', () => {
    test('responds with status 200 the GET method', () => {
        return request(server)
          .get('/scoops')
          .then((response: { statuCode: any; }) => {
            expect(response.statuCode).toBe(200);
          });
    });

    test('response has expected number of ice cream flavors, and each has a name and image', () => {
      return request(server)
        .get('/scoops')
        .then((response: { body: any[]; }) => {
          expect(response.body.length).toBe(4);
          response.body.forEach((flavor: { name: any; imagePath: any; }) => {
            expect(typeof flavor.name).toBe('string');
            expect(typeof flavor.imagePath).toBe('string');
          });
        });
    });
  });
  describe('toppings', () => {
    test('responds with status 200 the GET menthod', () => {
      return request(server)
        .get('/toppings')
        .then((response: { body: any[]; }) => {
          expect(response.body.length).toBe(6);
          response.body.forEach((topping: { name: any; imagePath: any; }) => {
            expect(typeof topping.name).toBe('string');
            expect(typeof topping.imagePath).toBe('string');
          });
        });
    });
  });
  describe('order number generator', () => {
    test('returns 201 for POST', () => {
      return request(app)
        .post('/order')
        .then((response: { statusCode: any; }) => {
          expect(response.statusCode).toBe(201);
        });
    });
    test('returns random "order number" for POST', () => {
      return request(app)
        .post("/order")
        .then((response: { body: { orderNumber: any; }; }) => {
          const orderNumber = response.body.orderNumber;
          expect(orderNumber).toBeLessThan(100000000000);
          expect(orderNumber).toBeGreaterThan(0);
        });
    });
  });
});


function server(server: any) {
  throw new Error('Function not implemented.');
}
/* test('button has correct initial color', () => {
  render(<App/>);

  //find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});

  //expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue'});

  //expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to red');
}); */



