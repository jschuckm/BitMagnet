import React from 'react';

import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';

import './App.css';

class BoardSelection extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenDialog=this.handleOpenDialog.bind(this);
        this.handleCloseDialog=this.handleCloseDialog.bind(this);
        this.registerNewBoard=this.registerNewBoard.bind(this);
        this.updateBoardList=this.updateBoardList.bind(this);
        this.printBoardsAsLinks=this.printBoardsAsLinks.bind(this);

        this.state = {
          //TODO: userName : access DB
          //TODO: get user's boards from DB and make array, dummy here:
          memberBoards : [
            {
            boardName : "BoardA",
            boardAddress: "http://google.com"
            }, {
            boardName : "BoardB",
            boardAddress: "http://google.com"
            }, {
            boardName : "BoardC",
            boardAddress: "http://google.com"}
          ]
        };
        this.updateBoardList(); //will build memberBoards dynamically
    }

    handleOpenDialog(){
      this.setState({openDialog: true});
    }

    handleCloseDialog(){
      this.setState({openDialog: false});
    }

    registerNewBoard(){
      //TODO: Send board name to DB
      this.updateBoardList();
      this.printBoardsAsList();
      return 0;
    }

    updateBoardList() {
      //TODO: reads boards from DB and builds array for state var memberBoards
    }

    printBoardsAsLinks() {
      return this.state.memberBoards.map((board) => {
          return (
            <Typography variant='h6' style={{fontFamily: 'Monospace'}}>
            <a href ={board.boardAddress}>{board.boardName}</a>
            </Typography>
          )
        });
      var memberBoards;
      this.setState( state => {
      memberBoards = this.state.memberBoards;
      return(memberBoards);
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
                <DialogTitle>Make Board</DialogTitle>
                <DialogContent>
                  <TextField onChange={(event) => this.setState({newBoard: event.target.value})} label={"Board Name"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.createNewBoard} style={{marginRight: '55px'}}>
                    Create Board
                  </Button>
                  <Button onClick={this.handleCloseDialog}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              <Typography variant='h3' style={{marginRight: '260px', marginTop: '60px', fontFamily: 'Monospace'}}>
                <em><b>Boards</b></em>
              </Typography>
              <div style={{
                marginTop: 10,
                height: 350,
                width: 400,
                display: 'flex',
                backgroundColor: blue[25],
                flexDirection: 'column',
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
                borderTop: '1px solid black',
                borderBottom: '1px solid black'
              }}>

              <Typography variant='h5' style={{marginLeft: '20px', marginTop: '20px', fontFamily: 'Monospace', display: 'block'}}>
                {this.printBoardsAsLinks()}
              </Typography>

              </div>
              <Button style={{marginLeft: '265px', marginTop: '10px'}} onClick={this.handleOpenDialog}>
                Make New Board
              </Button>
            </div>

          </div>
        );
    }
}
export default BoardSelection;
