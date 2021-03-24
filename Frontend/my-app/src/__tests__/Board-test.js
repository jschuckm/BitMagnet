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

it('Pop up is visible after click add magnet button', () => {
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
});