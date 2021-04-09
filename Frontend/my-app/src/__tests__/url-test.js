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