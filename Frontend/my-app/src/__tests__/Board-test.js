import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils"
import Board from '../Board';
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

it('Pop up is visible after click add magnet button and not visible after back button click', () => {
  act(()=>{
    render(<Board/>,container);
  });

  expect(document.querySelector('[data-testid="title"]').textContent).toBe("Board");
  expect(document.querySelector('[data-testid="createPopup"]')).toBe(null);
  const button = document.querySelector('[data-testid="addMagnetBtn"');
  expect(document.querySelector('[data-testid="addMagnetBtn"')).toBeVisible();
  act(()=>{
    button.dispatchEvent(new MouseEvent("click",{bubbles:true}));
  })
  expect(document.querySelector('[data-testid="createPopup"]')).toBeVisible();
  const button1 = document.querySelector('[data-testid="closeCreatePopup"');
  expect(document.querySelector('[data-testid="closeCreatePopup"')).toBeVisible();
  act(()=>{
    button1.dispatchEvent(new MouseEvent("click",{bubbles:true}));
  })
  expect(document.querySelector('[data-testid="createPopup"]')).not.toBeVisible();
});

it('Delete Pop up is visible after click delete magnet button and not visible after back button click', () => {
    act(()=>{
      render(<Board/>,container);
    });

    expect(document.querySelector('[data-testid="deletePopup"]')).toBe(null);
    const button = document.querySelector('[data-testid="deleteMagnetBtn"');
    expect(document.querySelector('[data-testid="deleteMagnetBtn"')).toBeVisible();
    act(()=>{
      button.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    })
    expect(document.querySelector('[data-testid="deletePopup"]')).toBeVisible();
    const button1 = document.querySelector('[data-testid="closeDeletePopup"');
    expect(document.querySelector('[data-testid="closeDeletePopup"')).toBeVisible();
    act(()=>{
      button1.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    })
    expect(document.querySelector('[data-testid="deletePopup"]')).not.toBeVisible();
  });