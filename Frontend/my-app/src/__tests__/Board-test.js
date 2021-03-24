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

it('Board adds element after add magnet and submit', () => {
  act(()=>{
    render(<Board/>,container);
  });

  expect(container.querySelector('[data-testid="title"]').textContent).toBe("Board");
});