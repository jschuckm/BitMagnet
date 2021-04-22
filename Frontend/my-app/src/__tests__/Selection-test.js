import { createShallow } from '@material-ui/core/test-utils';
import BoardSelection from '../BoardSelection';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import {MemoryRouter} from 'react-router-dom';
import { TextField } from '@material-ui/core';
import 'regenerator-runtime/runtime'


let container = null;

beforeEach(()=>{
    container = document.createElement("div");
    document.body.appendChild(container);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        //we can put return value here
      })
    }))
})

afterEach(()=>{
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('displays all interface material on loading, can open and close new board popup', () => {
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

it ('will contain state and memberBoards array', () => {
  let shallow = createShallow(); 

  const wrapper = shallow(<BoardSelection />);
  const instance = wrapper.instance();
  const state = instance.state;
  const boards = state.memberBoards;
  let numBoards = boards.length;
  expect(boards).toBeDefined();
  expect(typeof(numBoards) == 'number');
});

it('has a quit button with popup that opens and closes', () => {
  act(()=>{
    render(<MemoryRouter><BoardSelection/></MemoryRouter>,container);
  });

  expect(document.querySelector('[data-testid="deleteBoardPopup"]')).toBe(null);
  const quitButton = document.querySelector('[data-testid="quitBoardBtn"]');
  expect(quitButton).toBeVisible();
  act(() => {
    quitButton.dispatchEvent(new MouseEvent("click", {bubbles:true}));
  });
  expect(document.querySelector('[data-testid="deleteBoardPopup"]')).toBeVisible();
  const backButton = document.querySelector('[data-testid="boardDeleteCancel"]');
  expect(backButton).toBeVisible();
  act(() => {
    backButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
  });
  expect(document.querySelector('[data-testid="deleteBoardPopup"]')).not.toBeVisible();
});