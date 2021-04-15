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

it('Multiple Button Click Checking', () => {

  act(()=>{
    render(<Login/>,container);
  });

    const registerbutton = document.querySelector('[data-testid="registerButton"');

    //login page
    expect(document.querySelector('[data-testid="registerButton"')).toBeVisible();
    expect(document.querySelector('[data-testid="loginButton"')).toBeVisible();

    expect(document.querySelector('[data-testid="backButton"')).toBe(null);
    expect(document.querySelector('[data-testid="registerButton2"')).toBe(null);
    
    act(()=>{
      registerbutton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    })

    const backbutton = document.querySelector('[data-testid="backButton"');

    //register dialog
    expect(document.querySelector('[data-testid="backButton"')).toBeVisible();
    expect(document.querySelector('[data-testid="registerButton2"')).toBeVisible();

    expect(document.querySelector('[data-testid="registerButton"')).toBeVisible();
    expect(document.querySelector('[data-testid="loginButton"')).toBeVisible();

    act(()=>{
      backbutton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    })

    //login page
    expect(document.querySelector('[data-testid="registerButton"')).toBeVisible();
    expect(document.querySelector('[data-testid="loginButton"')).toBeVisible();

    expect(document.querySelector('[data-testid="backButton"')).not.toBeVisible();
    expect(document.querySelector('[data-testid="registerButton2"')).not.toBeVisible();

    act(()=>{
        registerbutton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    })

    //register dialog
    expect(document.querySelector('[data-testid="backButton"')).toBeVisible();
    expect(document.querySelector('[data-testid="registerButton2"')).toBeVisible();

    expect(document.querySelector('[data-testid="registerButton"')).toBeVisible();
    expect(document.querySelector('[data-testid="loginButton"')).toBeVisible();

    act(()=>{
        backbutton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    })

    //login page
    expect(document.querySelector('[data-testid="registerButton"')).toBeVisible();
    expect(document.querySelector('[data-testid="loginButton"')).toBeVisible();

    expect(document.querySelector('[data-testid="backButton"')).not.toBeVisible();
    expect(document.querySelector('[data-testid="registerButton2"')).not.toBeVisible();
});

it('Static UI Checks', () => {

    act(()=>{
      render(<Login/>,container);
    });

    expect(document.querySelector('[data-testid="registeredUsername"]')).toBe(null);
    expect(document.querySelector('[data-testid="registeredPassword"]')).toBe(null);
    expect(document.querySelector('[data-testid="registeredFirstName"]')).toBe(null);
    expect(document.querySelector('[data-testid="registeredLastName"]')).toBe(null);

    expect(document.querySelector('[data-testid="registeredFirstName"]')).toBe(null);
    expect(document.querySelector('[data-testid="registeredLastName"]')).toBe(null);
    expect(document.querySelector('[data-testid="registeredUsername"]')).toBe(null);
    expect(document.querySelector('[data-testid="registeredPassword"]')).toBe(null);

    expect(document.querySelector('[data-testid="username"]')).toBeVisible();
    expect(document.querySelector('[data-testid="password"]')).toBeVisible();

    expect(document.querySelector('[data-testid="title"]')).toBeVisible();
    expect(document.querySelector('[data-testid="title2"]')).toBe(null);
  
  });