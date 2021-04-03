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

        this.getFriendsList=this.getFriendsList.bind(this);
        this.printFriendsList=this.printFriendsList.bind(this);

        this.handleOpenDialogAddFriend=this.handleOpenDialogAddFriend.bind(this);
        this.handleCloseDialogAddFriend=this.handleCloseDialogAddFriend.bind(this);
        this.addFriend=this.addFriend.bind(this);

        this.handleOpenDialogDeleteFriend=this.handleOpenDialogDeleteFriend.bind(this);
        this.handleCloseDialogDeleteFriend=this.handleCloseDialogDeleteFriend.bind(this);
        this.deleteFriend=this.deleteFriend.bind(this);

        this.handleOpenDialogDeleteBoard = this.handleOpenDialogDeleteBoard.bind(this);
        this.handleCloseDialogDeleteBoard = this.handleCloseDialogDeleteBoard.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);

        this.state = {
          newBoard : '',
          removeBoard : '',
          newFriend : '',
          deletingFriend: '',
          openDialogFriends: false,
          openDialogAddFriend: false,
          openDialogDeleteFriend: false,
          openDialogDeleteBoard: false,

          //TO-FIX, temporary user for testing
          concrete_userID: 'b',

          friendsList: [],

          //TODO: userName : access DB
          //TODO: get user's boards from DB and make array, dummy here:
          memberBoards : []
        };
        this.buildBoardList(); //will build memberBoards dynamically
    }

    componentDidMount(){
      this.getFriendsList();
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

    handleOpenDialogAddFriend(){
      this.setState({openDialogAddFriend: true});
    }

    handleCloseDialogAddFriend(){
      this.setState({openDialogAddFriend: false});
    }

    handleOpenDialogDeleteFriend(){
      this.setState({openDialogDeleteFriend: true});
    }

    handleCloseDialogDeleteFriend(){
      this.setState({openDialogDeleteFriend: false});
    }

    handleOpenDialogDeleteBoard() {
      console.log("in delete brd open");
      this.setState({openDialogDeleteBoard: true});
    }

    handleCloseDialogDeleteBoard() {
      this.setState({openDialogDeleteBoard: false});
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
              userID: this.state.concrete_userID,
              boardName:this.state.newBoard
            }),
          });
          console.log("trying to add to board");
      }
      catch(e){
        console.log(e);
      }
      this.buildBoardList();
      this.setState({openDialog: false});
      this.setState({newBoard: ''});
    }

    deleteBoard(){
      try{
        fetch('/auth/:id/deleteBoard', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userID: this.state.concrete_userID,
              boardName:this.state.removeBoard
            }),
          });
          console.log("trying to break relationship with board and user");
      }
      catch(e){
        console.log(e);
      }
      this.buildBoardList();
      this.setState({openDialogDeleteBoard: false});
      this.setState({removeBoard: ''});
    }

    buildBoardList() {
      //reads boards from DB for state var memberBoards
      fetch('auth/:id/main', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: this.state.concrete_userID
          }),
        }).then(async response => {
          var tempBoardList = [];
          const data = await response.json();
          if (data != null) {
            for (var i = 0; i < data.length; i++) {
              tempBoardList.push(data[i]);
            }
            console.log("we have something", tempBoardList);
            this.setState({memberBoards: tempBoardList});
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

    printFriendsList() {
      return this.state.friendsList.map((friend) => {
        return (
          <Typography data-testid="boardlinks" variant='h5' style={{fontFamily: 'Monospace', marginTop: '10px', align: 'left'}}>
              {friend.friendID}
          </Typography>
        )
      });
    }

    getFriendsList(){
      var tempFriendsList = [];
      console.log("test!!!!!!!!!: " + this.props.location.state.detail);
      var tempURL = 'auth/' + this.props.location.state.detail + '/getFriends'
      try{
        // fetch('auth/t/getFriends')
        fetch(tempURL)
        .then(console.log("hello"))
        .then (response => response.json())
        .then( data => {
          console.log(data.length)
          for(var i=0; i<data.length; i++) {
            tempFriendsList.push(data[i])
          }
          this.setState({friendsList:tempFriendsList})
        })
      }
      catch(err){
        console.log(err);
      }
    }

    addFriend(){
      fetch('auth/:id/addFriend', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: this.state.concrete_userID,
            friendID: this.state.newFriend
          }),
        })
        this.getFriendsList();
        this.setState({openDialogAddFriend:false});
        this.setState({newFriend: ''});
    }

    deleteFriend(){
      fetch('auth/:id/deleteFriend', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            friendID: this.state.deletingFriend
          }),
        });
        this.getFriendsList();
        this.setState({openDialogDeleteFriend:false});
        this.setState({deleteFriend: ''});
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
              {/* Board Select Dialog */}
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

              {/*delete board dialog*/}
              <Dialog open={this.state.openDialogDeleteBoard} onClose={this.handleCloseDialogDeleteBoard}>
                <DialogTitle data-testid="deleteBoardPopup">Quit Board</DialogTitle>
                <DialogContent>
                  <TextField data-testid="boardDeleteText" onChange={(event) => this.setState({removeBoard: event.target.value})} label={"Board Name"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="boardDeleteSubmit" onClick={this.deleteBoard} style={{marginRight: '55px'}}>
                    Quit
                  </Button>
                  <Button data-testid="boardDeleteCancel" onClick={this.handleCloseDialogDeleteBoard}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Friend Dialog */}
              <Dialog open={this.state.openDialogFriends} onClose={this.handleCloseDialogFriends}>
                <DialogTitle>Friends List</DialogTitle>
                <DialogContent style={{overflowY: 'scroll', width: 300, height: 350}}>
                  {this.printFriendsList()}
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleOpenDialogAddFriend}>
                    Add Friend
                  </Button>
                  <Button onClick={this.handleOpenDialogDeleteFriend}>
                    Delete Friend
                  </Button>
                  <Button onClick={this.handleCloseDialogFriends}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Add Friend Dialog */}
              <Dialog open={this.state.openDialogAddFriend} onClose={this.handleCloseDialogAddFriend}>
                <DialogTitle>Add Friend</DialogTitle>
                <DialogContent>
                  <TextField onChange={(event) => this.setState({newFriend: event.target.value})} label={"Friend Username"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.addFriend} style={{marginRight: '55px'}}>
                    Add
                  </Button>
                  <Button onClick={this.handleCloseDialogAddFriend}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Delete Friend Dialog */}
              <Dialog open={this.state.openDialogDeleteFriend} onClose={this.handleCloseDialogDeleteFriend}>
                <DialogTitle>Delete Friend</DialogTitle>
                <DialogContent>
                  <TextField onChange={(event) => this.setState({deletingFriend: event.target.value})} label={"Username to Delete"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.deleteFriend} style={{marginRight: '55px'}}>
                    Delete
                  </Button>
                  <Button onClick={this.handleCloseDialogDeleteFriend}>
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
                  Start Board
                </Button>
                <Button style ={{}} data-testid="quitBoardBtn" onClick={this.handleOpenDialogDeleteBoard}>
                  Quit Board
                </Button>
              </div>
            </div>

          </div>
        );
    }
}
export default BoardSelection;
