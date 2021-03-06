import React from 'react';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Popper, Paper, List, ListItem } from '@material-ui/core';
import { AddCircleOutline,  DeleteOutline } from '@material-ui/icons';
import {Link} from 'react-router-dom';

import './App.css';

class BoardSelection extends React.Component {
    constructor(props) {
        super(props);

        this.handleOpenLogoutDialog=this.handleOpenLogoutDialog.bind(this);
        this.handleCloseLogoutDialog=this.handleCloseLogoutDialog.bind(this);
        this.logout=this.logout.bind(this);

        this.handleOpenDialog=this.handleOpenDialog.bind(this);
        this.handleCloseDialog=this.handleCloseDialog.bind(this);
        this.handleOpenDialogFriends=this.handleOpenDialogFriends.bind(this);
        this.handleCloseDialogFriends=this.handleCloseDialogFriends.bind(this);
        this.registerNewBoard=this.registerNewBoard.bind(this);
        this.buildBoardList=this.buildBoardList.bind(this);
        this.printBoardsAsLinks=this.printBoardsAsLinks.bind(this);

        //get friends
        this.getFriendsList=this.getFriendsList.bind(this);
        this.printFriendsList=this.printFriendsList.bind(this);

        //add friends
        this.handleOpenDialogAddFriend=this.handleOpenDialogAddFriend.bind(this);
        this.handleCloseDialogAddFriend=this.handleCloseDialogAddFriend.bind(this);
        this.addFriend=this.addFriend.bind(this);

        //delete friend
        this.handleOpenDialogDeleteFriend=this.handleOpenDialogDeleteFriend.bind(this);
        this.handleCloseDialogDeleteFriend=this.handleCloseDialogDeleteFriend.bind(this);
        this.deleteFriend=this.deleteFriend.bind(this);

        //share with friends
        this.handleOpenDialogShareFriend=this.handleOpenDialogShareFriend.bind(this);
        this.handleCloseDialogShareFriend=this.handleCloseDialogShareFriend.bind(this);

        this.addBoardShare=this.addBoardShare.bind(this);

        this.handleOpenDialogDeleteBoard = this.handleOpenDialogDeleteBoard.bind(this);
        this.handleCloseDialogDeleteBoard = this.handleCloseDialogDeleteBoard.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
        this.locationDetail = this.locationDetail.bind(this);

        this.state = {
          newBoard : '',
          tempBoard: '',
          removeBoard : '',
          newFriend : '',
          sharedFriend: '',
          deletingFriend: '',
          openDialogFriends: false,
          openDialogAddFriend: false,
          openDialogDeleteFriend: false,
          openDialogDeleteBoard: false,
          openDialogShareFriend: false,
          logoutDialog: false,

          //temporary user for testing
          //concrete_userID: 'b',

          friendsList: [],
          memberBoards : []
        };
    }

    componentDidMount(){
      this.getFriendsList();
      this.buildBoardList();
    }

    handleOpenLogoutDialog(){
      this.setState({logoutDialog: true});
    }

    handleCloseLogoutDialog(){
      this.setState({logoutDialog: false});
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

    handleOpenDialogShareFriend() {
      this.setState({openDialogShareFriend: true});
    }

    handleCloseDialogShareFriend() {
      this.setState({openDialogShareFriend: false});
    }

    handleOpenDialogDeleteBoard() {
      this.setState({openDialogDeleteBoard: true});
    }

    handleCloseDialogDeleteBoard() {
      this.setState({openDialogDeleteBoard: false});
    }

    locationDetail() {
      if (!this.props.location) {
        console.log("WARNING, no live user");
        return "test";
      }
      else return this.props.location.state.detail;
    }
    
    logout(){
      this.setState({logoutDialog: false});
      this.props.history.push({pathname: '/login'});
    }

    registerNewBoard(){
      let i;
      var tempURL = 'auth/' + this.locationDetail() + '/addBoard'
        fetch(tempURL, {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userID: this.state.concrete_userID,
              boardName:this.state.newBoard
            }),
          }).then(async response => {
            const data = await response.json();
            console.log(data);
            if (data.newboardstatus == true) {
              console.log("new board added");
              this.buildBoardList();
              this.setState({openDialog: false});
              this.setState({newBoard: ''});
            } else if (data.newboardstatus == false) {
              console.log("no new board added, see alert");
              alert("BitMagnet already has a board with that name");
            }
          })
    }

    deleteBoard(){
      let i; let exists = 0;
      for (i = 0; i < this.state.memberBoards.length; i++) {
        if (this.state.memberBoards[i].boardName == this.state.removeBoard) {
          exists = 1;
          break;
        }
      }
      if (!exists) alert ("Such a board doesn't exist.");
      var tempURL = 'auth/' + this.locationDetail() + '/deleteBoard'
      try{
        fetch(tempURL, {
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
      var tempURL = 'auth/' + this.locationDetail() + '/main'
      fetch(tempURL)
      .then(async response => {
        var tempBoardList = [];
        const data = await response.json();
        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            tempBoardList.push(data[i]);
          }
          console.log("we have something boardsy", tempBoardList);
          this.setState({memberBoards: tempBoardList});
        }
        else {
          console.log("we don't have something boardsy");
        }
      });
    }

    printBoardsAsLinks() {
      return(
        this.state.memberBoards.map((board) => 
          <Paper style={{ marginRight: '5px', marginLeft:'-10px', borderLeft: '1px solid black', borderRight: '1px solid black', borderTop: '1px solid black', borderBottom: '1px solid black'}}>
            <List>
              <Link to={{pathname: `/board/${board.boardName}`, state: {detail: this.props.location.state.detail}}} style={{ textDecoration: 'none', marginLeft:'10px' }}>{board.boardName}</Link>
            </List><br></br>
          </Paper>
        )
      )
    }

    printFriendsList() {
      return this.state.friendsList.map((friend) => {
        return (
          <Typography data-testid="friendlist" variant='h5' style={{fontFamily: 'Monospace', marginTop: '10px', align: 'left'}}>
            {friend.friendID}
          </Typography>
        )
      });
    }

    getFriendsList(){
      var tempFriendsList = [];
      console.log("test get ID: " + this.locationDetail());
      var tempURL = 'auth/' + this.locationDetail() + '/getFriends';
      try{
        // fetch('auth/t/getFriends')
        fetch(tempURL)
        .then(console.log("hello"))
        .then (response => response.json())
        .then(data => {
          console.log(data)
          console.log(data.length)
          for(var i=0; i<data.length; i++) {
            tempFriendsList.push(data[i])
          }
          this.setState({friendsList:tempFriendsList})
          /*
          this.props.history.push({
            state: { detail2: this.state.friendsList }
          });
          */
        })
      }
      catch(err){
        console.log(err);
      }
    }

    addFriend(){
      var tempURL = 'auth/' + this.locationDetail() + '/addFriend'
      fetch(tempURL, {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            friendID: this.state.newFriend
          }),
        }).then(async response => {
          const data = await response.json();
          console.log(data);
          console.log(data.usernameStatus);
          if(data.usernameStatus == true) {
            console.log("successful")
            this.getFriendsList();
            this.setState({openDialogAddFriend:false});
            this.setState({newFriend: ''});
          } else if(data.usernameStatus == false) {
            console.log("failed friend addition");
            alert("No username found/Already a Friend");
          }
        });
    }

    deleteFriend(){
      var tempURL = 'auth/' + this.locationDetail() + '/deleteFriend'
      fetch(tempURL, {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            friendID: this.state.deletingFriend
          }),
        }).then(async response => {
          const data = await response.json();
          console.log(data);
          console.log(data.usernameStatus2);
          if(data.usernameStatus2 == true) {
            console.log("successful")
            this.getFriendsList();
            this.setState({openDialogDeleteFriend:false});
            this.setState({deleteFriend: ''});
          } else if(data.usernameStatus2 == false) {
            console.log("failed friend deletion");
            alert("No username found");
          }
        });
    }

    addBoardShare(){
      var tempURL = 'auth/' + this.locationDetail() + '/addBoardShare'
      console.log(this.state.sharedFriend);
      try{
        fetch(tempURL, {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userID: this.state.sharedFriend,
              boardName:this.state.tempBoard
            }),
          }).then(async response => {
            const data = await response.json();
            console.log(data);
            console.log(data.status);
            if(data.status == true) {
              this.setState({openDialogShareFriend: false});
              this.setState({sharedFriend: ''});
              this.setState({tempBoard: ''});
              console.log("trying to share board");
            } else if(data.status == false) {
              console.log("sharing failure");
              alert("Error. Enter an existing board and friend. Cannot be a duplicate.");
            }
          });
      }
      catch(e){
        console.log(e);
      }
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
              {/* Logout dialog */}
              <Dialog open={this.state.logoutDialog} onClose={this.handleCloseLogoutDialog}>
                <DialogTitle>Are you sure you would like to log out?</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                  <Button variant='contained' style={{marginRight: '85px', backgroundColor: red[200]}} onClick={this.logout}>
                    Logout
                  </Button>
                  <Button variant='contained' onClick={this.handleCloseLogoutDialog}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Board Select Dialog */}
              <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog}>
                <DialogTitle data-testid="boardAddPopup"><u>New Board</u></DialogTitle>
                <DialogContent>
                  <TextField data-testid="boardAddText" onChange={(event) => this.setState({newBoard: event.target.value})} label={"Board Name"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="boardAddSubmit" variant='contained' onClick={this.registerNewBoard} style={{marginRight: '55px', backgroundColor: green[200]}}>
                    Create Board
                  </Button>
                  <Button data-testid="boardAddCancel" variant='contained' onClick={this.handleCloseDialog}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>

              {/*delete board dialog*/}
              <Dialog open={this.state.openDialogDeleteBoard} onClose={this.handleCloseDialogDeleteBoard}>
                <DialogTitle data-testid="deleteBoardPopup"><u>Quit Board</u></DialogTitle>
                <DialogContent>
                  <TextField data-testid="boardDeleteText" onChange={(event) => this.setState({removeBoard: event.target.value})} label={"Board Name"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="boardDeleteSubmit" variant='contained' onClick={this.deleteBoard} style={{marginRight: '70px', backgroundColor: red[200]}}>
                    Quit
                  </Button>
                  <Button data-testid="boardDeleteCancel" variant='contained' onClick={this.handleCloseDialogDeleteBoard}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Friend Dialog */}
              <Dialog data-testid="friendDialog" open={this.state.openDialogFriends} onClose={this.handleCloseDialogFriends}>
                <DialogTitle><u>Friends List</u></DialogTitle>
                <DialogContent style={{backgroundColor: grey[100], overflowY: 'scroll', marginLeft: '10px', width: 300, height: 350}}>
                  {this.printFriendsList()}
                </DialogContent>
                <DialogActions>
                  <Button data-testid="friendDialogAdd" variant='contained' style={{backgroundColor: green[200]}} onClick={this.handleOpenDialogAddFriend}>
                    Add Friend
                  </Button>
                  <Button data-testid="friendDialogDelete" variant='contained' style={{backgroundColor: red[200]}} onClick={this.handleOpenDialogDeleteFriend}>
                    Delete Friend
                  </Button>
                  <Button variant='contained' onClick={this.handleCloseDialogFriends}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Add Friend Dialog */}
              <Dialog data-testid="addFriendDialog" open={this.state.openDialogAddFriend} onClose={this.handleCloseDialogAddFriend}>
                <DialogTitle><u>Add Friend</u></DialogTitle>
                <DialogContent>
                  <TextField data-testid="addfriend" onChange={(event) => this.setState({newFriend: event.target.value})} label={"Friend Username"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button variant='contained' style={{backgroundColor: green[200], marginRight: '65px'}} onClick={this.addFriend}>
                    Add
                  </Button>
                  <Button data-testid="addFriendDialogBack" variant='contained' onClick={this.handleCloseDialogAddFriend}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Delete Friend Dialog */}
              <Dialog data-testid="deleteFriendDialog" open={this.state.openDialogDeleteFriend} onClose={this.handleCloseDialogDeleteFriend}>
                <DialogTitle><u>Delete Friend</u></DialogTitle>
                <DialogContent>
                  <TextField data-testid="deletefriends" onChange={(event) => this.setState({deletingFriend: event.target.value})} label={"Username to Delete"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button variant='contained' style={{backgroundColor: red[200], marginRight: '55px'}} onClick={this.deleteFriend}>
                    Delete
                  </Button>
                  <Button data-testid="deleteFriendDialogBack" variant='contained' onClick={this.handleCloseDialogDeleteFriend}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Share Friends Dialog */}
              <Dialog open={this.state.openDialogShareFriend} onClose={this.handleCloseDialogShareFriend}>
                <DialogTitle>Share a board with a friend</DialogTitle>
                <DialogContent>
                  <TextField data-testid="tempboard" onChange={(event) => this.setState({tempBoard: event.target.value})} label={"Board"}/><br></br>
                  <TextField data-testid="sharedfriend" onChange={(event) => this.setState({sharedFriend: event.target.value})} label={"Friend"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.addBoardShare} style={{marginRight: '140px'}}>
                    Share
                  </Button>
                  <Button onClick={this.handleCloseDialogShareFriend}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              <div style = {{height:"35px",width:"100%",borderBottom:"1px solid black",display:"flex",justifyContent:"space-between"}}>
              <Typography variant='h6' style={{fontFamily: 'Monospace',position:"relative",left:"1vh",width:"fit-content"}}>
                <em><b>Bit Magnet</b></em>
              </Typography>
              <div style={{position:"relative",right:"1vh"}}>
              <Button data-testid="friendsBoardPopUp" onClick={this.handleOpenDialogFriends}>
                Friends
              </Button>
              <Button onClick={this.handleOpenLogoutDialog}>
                Logout
              </Button>
              </div>
              </div>
              <Typography variant='h3' style={{marginRight: '236px', marginTop: '60px', fontFamily: 'Monospace'}}>
                <em><b data-testid="title">Boards</b></em>
              </Typography>
              {/*
              <Button style={{marginLeft: '290px'}} onClick={this.handleOpenDialogShareFriend}>
                  Share
              </Button>
              */}
              <div style={{
                marginTop: 10,
                height: 350,
                width: 400,
                display: 'flex',
                overflowY: 'scroll',
                backgroundColor: grey[100],
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
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '250px'
              }}>
                <Button variant='contained' style ={{marginTop: '20px', backgroundColor: green[200]}} data-testid="addBoardBtn" onClick={this.handleOpenDialog}>
                  New Board  <AddCircleOutline style={{marginLeft:'5px'}}/>
                </Button>
                <Button variant='contained' style ={{marginTop: '10px', backgroundColor: red[200]}} data-testid="quitBoardBtn" onClick={this.handleOpenDialogDeleteBoard}>
                  Quit Board  <DeleteOutline style={{marginLeft:'5px'}}/>
                </Button>
              </div>
            </div>

          </div>
        );
    }
}
export default BoardSelection;
