import { createShallow } from '@material-ui/core/test-utils';
import BoardSelection from '../BoardSelection';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import {MemoryRouter} from 'react-router-dom';
import { TextField } from '@material-ui/core';

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

it('displays all interface material on loading, can open and close dialog popup', () => {
  act(()=>{
    render(<MemoryRouter><BoardSelection/></MemoryRouter>,container);
  });
  expect(document.querySelector('[data-testid="title"]').textContent).toBe("Boards");

  expect(document.querySelector('[data-testid="boardAddPopup"]')).toBe(null);
  const button = document.querySelector('[data-testid="addBoardBtn"]');
  expect(button).toBeVisible();
  act(() => {
    button.dispatchEvent(new MouseEvent("click", {bubbles:true}));
  });
  expect(document.querySelector('[data-testid="boardAddPopup"]')).toBeVisible();
  const closePopupBtn = document.querySelector('[data-testid="boardAddCancel"]');
  expect(closePopupBtn).toBeVisible();
  act(() => {
    closePopupBtn.dispatchEvent(new MouseEvent("click", {bubbles: true}));
  });
  expect(document.querySelector('[data-testid="boardAddPopup"]')).not.toBeVisible();
});

it ('will test existance of state and memberBoards array', () => {
  let shallow = createShallow(); 

  const wrapper = shallow(<BoardSelection />);
  const instance = wrapper.instance();
  const state = instance.state;
  const boards = state.memberBoards;
  let numBoards = boards.length;
  expect(boards).toBeDefined();
  expect(typeof(numBoards) == 'number');
});