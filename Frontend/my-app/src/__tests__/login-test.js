import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils"
import Login from '../Login';

let container = null;
beforeEach(()=>{
    container = document.createElement("div");
    document.body.appendChild(container);
})
afterEach(()=>{
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('Null Checking', () => {
    act(()=>{
      render(<Login/>,container);
    });
    expect(document.querySelector('[data-testid="registeredUsername"]')).toBe(null);
    expect(document.querySelector('[data-testid="registeredPassword"]')).toBe(null);
    expect(document.querySelector('[data-testid="registeredFirstName"]')).toBe(null);
    expect(document.querySelector('[data-testid="registeredLastName"]')).toBe(null);
});

it('Login Screen UI Checking', () => {
  act(()=>{
    render(<Login/>,container);
  });
  expect(document.querySelector('[data-testid="username"]')).toBeVisible();
  expect(document.querySelector('[data-testid="password"]')).toBeVisible();
});

it('Register Screen UI Checking', () => {
    act(()=>{
      render(<Login/>,container);
    });
    const registerbutton = document.querySelector('[data-testid="registerButton"');
    expect(document.querySelector('[data-testid="registerButton"')).toBeVisible();
    act(()=>{
      registerbutton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    })
    expect(document.querySelector('[data-testid="registeredFirstName"]')).toBeVisible();
    expect(document.querySelector('[data-testid="registeredLastName"]')).toBeVisible();
    expect(document.querySelector('[data-testid="registeredUsername"]')).toBeVisible();
    expect(document.querySelector('[data-testid="registeredPassword"]')).toBeVisible();
    const backbutton = document.querySelector('[data-testid="backButton"');
    expect(document.querySelector('[data-testid="backButton"')).toBeVisible();
    act(()=>{
      backbutton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    })
    expect(document.querySelector('[data-testid="registeredFirstName"]')).not.toBeVisible();
    expect(document.querySelector('[data-testid="registeredLastName"]')).not.toBeVisible();
    expect(document.querySelector('[data-testid="registeredUsername"]')).not.toBeVisible();
    expect(document.querySelector('[data-testid="registeredPassword"]')).not.toBeVisible();
});
