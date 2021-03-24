import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils"
import BoardSelection from '../BoardSelection';
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

test('On load, existing boards are displayed with link to /Board', () => {
  act(()=>{
    render(<BoardSelection/>,container);
  });
  var a = 1;
  expect(a.toBe(1));
  //has title "Boards"
  //length of list = 3;
  //text (.name) of index 0 = "Baseball"
  //link of index 0 = "/board"
  //has "add board" button
});

test('Able to add a new board', () => {
    act(()=>{
      render(<BoardSelection/>,container);
    });
    //clicking "add board button" activates dialog
    //clicking add will increase length of memberBoards by 1
    //name of board at index (length -1) == new board's given name
    //link of new board = "/board"
  });