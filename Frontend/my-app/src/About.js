import React from 'react';

import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { Button, Typography } from '@material-ui/core';


import './App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
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
              <Button>
                Register
              </Button>
              <Button onClick={()=>this.props.history.push('/login')}>
                Login
              </Button>
              </div>
              </div>

              
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
                <Typography data-testid="title" variant='p' style={{textAlign:"left", margin: "1vh", fontSize:"0.85rem",fontFamily: 'Monospace'}}>
                <em><b>     Bit Magnet is a social media platform for sharing photos, notes, and drawings with defined user groups. When they create an account, users can start their own boards or be added to existing ones. Members of a group board can upload images, post notes, and design doodles. The platform is a way for members from different groups to stay current on personal events, important reminders, and have fun. Students could treat the site like a school locker, sharing photos and bonding through collaborative content and responses. Family group usage would be like a home fridge, where they could post children’s drawings, report cards, birthday reminders, or personal messages.</b></em>
              </Typography>
              </div>
              <Typography data-testid="title" variant='h3' style={{marginRight: '175px', marginTop: '-310px', fontFamily: 'Monospace'}}>
                <em><b>About</b></em>
              </Typography>
            </div>
          </div>
        );
    }
}
export default Login;
