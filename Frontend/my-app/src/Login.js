import React from 'react';

import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Divider } from '@material-ui/core';
import { Help } from '@material-ui/icons';
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom';

import './App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenDialog=this.handleOpenDialog.bind(this);
        this.handleCloseDialog=this.handleCloseDialog.bind(this);
        this.usernameHoverOpenDialog=this.usernameHoverOpenDialog.bind(this);
        this.usernameHoverCloseDialog=this.usernameHoverCloseDialog.bind(this);
        this.passwordHoverOpenDialog=this.passwordHoverOpenDialog.bind(this);
        this.passwordHoverCloseDialog=this.passwordHoverCloseDialog.bind(this);
        this.registerAuthentication=this.registerAuthentication.bind(this);
        this.loginAuthentication=this.loginAuthentication.bind(this);
        this.state = {
            username: '',
            password: '',
            openDialog: false,
            usernameOpenDialog: false,
            passwordOpenDialog: false,
            registeredFirstName: '',
            registeredLastName: '',
            registeredUsername: '',
            registeredPassword: ''
        };
    }

    handleOpenDialog(){
      this.setState({openDialog: true});
    }

    handleCloseDialog(){
      this.setState({openDialog: false});
    }

    registerAuthentication(){
      if(this.state.registeredUsername.length < 1 || this.state.registeredUsername.length > 15)
      {
        alert("Username must be <b>1-15</b> characters. May contain letters, numbers, or symbols.")
      }
      else if(this.state.registeredPassword.length < 5 || this.state.registeredPassword.length > 15)
      {
        alert("Password must be <b>1-15</b> characters. May contain letters, numbers, or symbols.")
      }
      else
      {
        try{
          fetch('/auth/register', {
            method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                users: this.state.registeredUsername,
                password: this.state.registeredPassword,
                FirstName: this.state.registeredFirstName,
                LastName: this.state.registeredLastName,
              }),
            });
  
            this.setState({openDialog: false});
        }
        catch(e){
          console.log(e);
        }
      }
      
    }

    loginAuthentication(){
      fetch('auth/login', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            users: this.state.username,
            password: this.state.password,
          }),
      }).then(async response => {
        const data = await response.json();
        console.log(data);
        console.log(data.loginStatus);
        if(data.loginStatus == true) {
          console.log("successful")
          //this.props.history.push('/boardselection');
          this.props.history.push({
            pathname: '/boardselection',
            state: { detail: this.state.username }
          });
        } else if(data.loginStatus == false) {
          console.log("fail login");
          alert("Wrong ID or Password");
        }
      });
      
    }

    usernameHoverOpenDialog(){
      this.setState({usernameOpenDialog: true});
    }

    usernameHoverCloseDialog(){
      this.setState({usernameOpenDialog: false});
    }

    passwordHoverOpenDialog(){
      this.setState({passwordOpenDialog: true});
    }

    passwordHoverCloseDialog(){
      this.setState({passwordOpenDialog: false});
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
              <div style = {{height:"35px",width:"100%",borderBottom:"1px solid black",display:"flex",justifyContent:"space-between"}}>
              <Typography variant='h6' style={{fontFamily: 'Monospace',position:"relative",left:"1vh",width:"fit-content"}}>
                <em><b>Bit Magnet</b></em>
              </Typography>
              <div style={{position:"relative",right:"1vh"}}>
              <Button onClick={()=>this.props.history.push('/about')}>
                About
              </Button>
              <Button onClick={()=>this.props.history.push('/login')}>
                Login
              </Button>
              </div>
              </div>

              <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog}>
                <DialogTitle data-testid="title2"><u>Register Account</u></DialogTitle>
                <DialogContent>
                  <TextField data-testid="registeredFirstName" onChange={(event) => this.setState({registeredFirstName: event.target.value})} label={"First Name"}/><br></br><br></br>
                  <TextField data-testid="registeredLastName" onChange={(event) => this.setState({registeredLastName: event.target.value})} label={"Last Name"}/><br></br><br></br>
                  <div style={{ flexDirection: 'row' }}>
                    <TextField data-testid="registeredUsername" onChange={(event) => this.setState({registeredUsername: event.target.value})} label={"Username"}/>
                    <IconButton style={{marginTop: '10px'}} onClick={this.usernameHoverOpenDialog}><Help /></IconButton>
                  </div><br></br>
                  <div style={{ flexDirection: 'row' }}>
                    <TextField data-testid="registeredPassword" onChange={(event) => this.setState({registeredPassword: event.target.value})} label={"Password"} inputProps={{type: 'password'}}/>
                    <IconButton style={{marginTop: '10px'}} onClick={this.passwordHoverOpenDialog}><Help /></IconButton>
                  </div><br></br>
                </DialogContent>
                <DialogActions>
                  <Button variant='contained' data-testid="registerButton2" onClick={this.registerAuthentication} style={{marginRight: '70px'}}>
                    Register
                  </Button>
                  <Button variant='contained' data-testid="backButton" onClick={this.handleCloseDialog} style={{marginRight: '8px'}}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              {/*username hover dialog */}
              <Dialog open={this.state.usernameOpenDialog} onClose={this.usernameHoverCloseDialog}>
                <DialogContent>
                  <Typography>Must be <b>1-15</b> characters. May contain letters, numbers, or symbols.</Typography>
                </DialogContent>
                <DialogActions>
                </DialogActions>
              </Dialog>
              {/*password hover dialog */}
              <Dialog open={this.state.passwordOpenDialog} onClose={this.passwordHoverCloseDialog}>
                <DialogContent>
                  <Typography>Must be <b>5-15</b> characters. May contain letters, numbers, or symbols.</Typography>
                </DialogContent>
                <DialogActions>
                </DialogActions>
              </Dialog>
              <div style={{
              marginTop: 240,
              height: 240,
              width: 400,
              display: 'flex',
              backgroundColor: grey[50],
              flexDirection: 'column',
              alignItems: 'center',
              borderLeft: '1px solid black',
              borderRight: '1px solid black',
              borderTop: '1px solid black',
              borderBottom: '1px solid black'
              }}> 
                <TextField data-testid="username" onChange={(event) => this.setState({username: event.target.value})} label={"Username"} style={{marginBottom: '20px', marginTop: '25px'}} />
                <TextField data-testid="password" onChange={(event) => this.setState({password: event.target.value})} label={"Password"} style={{marginBottom: '20px'}} inputProps={{type: 'password'}} />
                <Button variant="contained" style={{marginTop: '20px'}} data-testid="loginButton" onClick={this.loginAuthentication}>
                  Login
                </Button>
              </div>
              <Typography data-testid="title" variant='h3' style={{marginRight: '175px', marginTop: '-310px', fontFamily: 'Monospace'}}>
                <em><b>Login</b></em>
              </Typography>
              <Button variant="contained" data-testid="registerButton" style={{marginRight: '300px', marginTop: '280px'}} onClick={this.handleOpenDialog}>
                Register
              </Button>
            </div>
          </div>
        );
    }
}
export default Login;
