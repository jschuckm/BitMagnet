import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils"
import Board from '../Board';
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

it('Will show button to add text magnet, will open and close popup', () => {
  act(()=>{
    render(<Board/>,container);
  });

  expect(document.querySelector('[data-testid="title"]').textContent).toBe("Board");

  expect(document.querySelector('[data-testid="createTextPopup"]')).toBe(null);
  expect(document.querySelector('[data-testid="addTextMagnetBtn"')).toBeVisible();
  const addTextButton = document.querySelector('[data-testid="addTextMagnetBtn"');
  act(()=>{
    addTextButton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
  })
  expect(document.querySelector('[data-testid="createTextPopup"]')).toBeVisible();
  expect(document.querySelector('[data-testid="closeCreateTextPopup"')).toBeVisible();
  const closeTextButton = document.querySelector('[data-testid="closeCreateTextPopup"');
  act(()=>{
    closeTextButton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
  })
  expect(document.querySelector('[data-testid="createTextPopup"]')).not.toBeVisible();
});

it('Will show button to add photo magnet, will open and close popup', () => {
  act(()=>{
    render(<Board/>,container);
  });
  expect(document.querySelector('[data-testid="createPhotoPopup"]')).toBe(null);
  expect(document.querySelector('[data-testid="addPhotoMagnetBtn"')).toBeVisible();
  const addPhotoButton = document.querySelector('[data-testid="addPhotoMagnetBtn"');
  act(()=>{
    addPhotoButton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
  })
  expect(document.querySelector('[data-testid="createPhotoPopup"]')).toBeVisible();
  expect(document.querySelector('[data-testid="closeCreatePhotoPopup"')).toBeVisible();
  const closePhotoButton = document.querySelector('[data-testid="closeCreatePhotoPopup"');
  act(()=>{
    closePhotoButton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
  })
  expect(document.querySelector('[data-testid="createPhotoPopup"]')).not.toBeVisible();
});

it('Will show button to view members, will open and close popup', () => {
    act(()=>{
      render(<Board/>,container);
    });
    expect(document.querySelector('[data-testid="GetMemberList"]')).toBe(null);
    expect(document.querySelector('[data-testid="viewMembersBtn"')).toBeVisible();
    const viewMembersButton = document.querySelector('[data-testid="viewMembersBtn"');
    act(()=>{
      viewMembersButton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    })
    expect(document.querySelector('[data-testid="viewMembersPopup"]')).toBeVisible();
    expect(document.querySelector('[data-testid="closeMembersPopup"')).toBeVisible();
    const closeMembersButton = document.querySelector('[data-testid="closeMembersPopup"');
    act(()=>{
      closeMembersButton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
    })
    expect(document.querySelector('[data-testid="viewMembersPopup"]')).not.toBeVisible();
});

it('Will get to add member popup, will open and close popup', () => {
  act(()=>{
    render(<Board/>,container);
  });
  const viewMembersButton = document.querySelector('[data-testid="viewMembersBtn"');
  act(()=>{
    viewMembersButton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
  })
  expect(document.querySelector('[data-testid="addMembersPopup"]')).toBe(null);
  const addMembersButton = document.querySelector('[data-testid="addMemberButton"');
  act(()=>{
    addMembersButton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
  })
  expect(document.querySelector('[data-testid="addMembersPopup"]')).toBeVisible();
  expect(document.querySelector('[data-testid="closeAddMembersPopup"')).toBeVisible();
  const closeAddMembersButton = document.querySelector('[data-testid="closeAddMembersPopup"');
  act(() => {
    closeAddMembersButton.dispatchEvent(new MouseEvent("click",{bubbles:true}));
  })
  expect(document.querySelector('[data-testid="closeAddMembersPopup"')).not.toBeVisible();

});