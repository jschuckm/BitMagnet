import React from 'react';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';

import './App.css';

class BoardSelection extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenDialog=this.handleOpenDialog.bind(this);
        this.handleCloseDialog=this.handleCloseDialog.bind(this);
        this.handleOpenDialogFriends=this.handleOpenDialogFriends.bind(this);
        this.handleCloseDialogFriends=this.handleCloseDialogFriends.bind(this);
        this.registerNewBoard=this.registerNewBoard.bind(this);
        this.buildBoardList=this.buildBoardList.bind(this);
        this.printBoardsAsLinks=this.printBoardsAsLinks.bind(this);

        this.state = {
          newBoard : '',
          openDialogFriends: false,
          memberBoards : [
            {
            boardName : "Baseball Team"
            }, {
            boardName : "MOM"
            }, {
            boardName : "Lunch Gang"
            }
          ]
        };
        this.buildBoardList(); //will build memberBoards dynamically
    }

    handleOpenDialog(){
      this.setState({openDialog: true});
    }

    handleCloseDialog(){
      this.setState({openDialog: false});
    }

    handleOpenDialogFriends(){
      this.setState({openDialogFriends: true});
    }

    handleCloseDialogFriends(){
      this.setState({openDialogFriends: false});
    }

    registerNewBoard(){
      try{
        fetch('/auth/:id/addBoard', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              boardName:this.state.newBoard
            }),
          });
          console.log("trying to add to board");
          this.setState({openDialog: false});
      }
      catch(e){
        console.log(e);
      }
      this.state.memberBoards.push({boardName:this.state.newBoard}); //will this be redundant after board is added to db?
      this.printBoardsAsLinks();
    }

    buildBoardList() {
      //reads boards from DB for state var memberBoards
      fetch('auth/:id/main', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }).then(async response => {
          const boardList = await response.json();
          console.log(boardList);
          if (boardList != null) {
            console.log("we have something");
            this.state.memberBoards = boardList;
          }
          else {
            console.log("we don't have something");
          }
          });
    }

    printBoardsAsLinks() {
      return this.state.memberBoards.map((board) => {
        var link = "/board";
          return (
              <Typography data-testid="boardlinks" variant='h5' style={{fontFamily: 'Monospace', marginTop: '10px', align: 'left'}}>
                <Link to={link}>{board.boardName}</Link>
              </Typography>
          )
        });
    }

    render() {
        return (
          <div style={{
            height: window.innerHeight,
            display: 'flex',
            backgroundColor: blue[100],
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              height: window.innerHeight,
              width: window.innerWidth * 2 / 3,
              display: 'flex',
              backgroundColor: blue[50],
              flexDirection: 'column',
              alignItems: 'center',
              borderLeft: '1px solid black',
              borderRight: '1px solid black'
            }}>
              <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog}>
                <DialogTitle data-testid="boardAddPopup">Make Board</DialogTitle>
                <DialogContent>
                  <TextField data-testid="boardAddText" onChange={(event) => this.setState({newBoard: event.target.value})} label={"Board Name"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="boardAddSubmit" onClick={this.registerNewBoard} style={{marginRight: '55px'}}>
                    Create Board
                  </Button>
                  <Button data-testid="boardAddCancel" onClick={this.handleCloseDialog}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog open={this.state.openDialogFriends} onClose={this.handleCloseDialogFriends}>
                <DialogTitle>Friends List</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseDialogFriends}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              <Typography variant='h3' style={{marginRight: '236px', marginTop: '60px', fontFamily: 'Monospace'}}>
                <em><b data-testid="title">Boards</b></em>
              </Typography>
              <div style={{
                marginTop: 10,
                height: 350,
                width: 400,
                display: 'flex',
                overflowY: 'scroll',
                backgroundColor: grey[50],
                flexDirection: 'column',
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
                borderTop: '1px solid black',
                borderBottom: '1px solid black'
              }}>
              <span style = {{
                paddingTop: 10,
                paddingBottom: 20,
                marginLeft: 20,
                textAlign: 'left'
              }}>

                {this.printBoardsAsLinks()}

              </span>
              </div>
              <div style={{
              display: 'flex'
              }}>
                <Button style={{marginRight: '175px'}} onClick={this.handleOpenDialogFriends}>
                  Friends
                </Button>
                <Button data-testid="addBoardBtn" onClick={this.handleOpenDialog}>
                  Make New Board
                </Button>
              </div>
            </div>

          </div>
        );
    }
}
export default BoardSelection;
