import React from 'react';

import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import { Redirect } from "react-router-dom";

import './App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenDialog=this.handleOpenDialog.bind(this);
        this.handleCloseDialog=this.handleCloseDialog.bind(this);
        this.registerAuthentication=this.registerAuthentication.bind(this);
        this.loginAuthentication=this.loginAuthentication.bind(this);
        this.state = {
            username: '',
            password: '',
            openDialog: false,
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
          this.props.history.push('/boardselection');
        } else if(data.loginStatus == false) {
          console.log("fail login");
          alert("Wrong ID or Password");
        }
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
              {/* About me */}
              <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog}>
                <DialogTitle>Register Account</DialogTitle>
                <DialogContent>
                  <TextField onChange={(event) => this.setState({registeredFirstName: event.target.value})} label={"First Name"}/><br></br>
                  <TextField onChange={(event) => this.setState({registeredLastName: event.target.value})} label={"Last Name"}/><br></br>
                  <TextField onChange={(event) => this.setState({registeredUsername: event.target.value})} label={"Username"}/><br></br>
                  <TextField onChange={(event) => this.setState({registeredPassword: event.target.value})} label={"Password"} inputProps={{type: 'password'}}/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.registerAuthentication} style={{marginRight: '55px'}}>
                    Register
                  </Button>
                  <Button onClick={this.handleCloseDialog}>
                    Back
                  </Button>
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
                <TextField onChange={(event) => this.setState({username: event.target.value})} label={"Username"} style={{marginBottom: '20px', marginTop: '25px'}} />
                <TextField onChange={(event) => this.setState({password: event.target.value})} label={"Password"} style={{marginBottom: '20px'}} inputProps={{type: 'password'}} />
                <Button onClick={this.loginAuthentication}>
                  Login
                </Button>
              </div>
              <Typography variant='h3' style={{marginRight: '175px', marginTop: '-310px', fontFamily: 'Monospace'}}>
                <em><b>Bit Magnet</b></em>
              </Typography>
              <Button style={{marginRight: '310px', marginTop: '280px'}} onClick={this.handleOpenDialog}>
                Register
              </Button>
            </div>
          </div>
        );
    }
}
export default Login;
