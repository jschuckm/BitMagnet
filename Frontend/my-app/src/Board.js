import React from 'react';

import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';

import './App.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenDialog=this.handleOpenDialog.bind(this);
        this.handleCloseDialog=this.handleCloseDialog.bind(this);
        this.handleOpenDialogDelete=this.handleOpenDialogDelete.bind(this);
        this.handleCloseDialogDelete=this.handleCloseDialogDelete.bind(this);
        this.createMagnet=this.createMagnet.bind(this);
        this.deleteMagnet=this.deleteMagnet.bind(this);
        this.printMagnets=this.printMagnets.bind(this);
        this.state = {
            magnets: []
        };
    }

    handleOpenDialog(){
      this.setState({openDialog: true});
    }

    handleCloseDialog(){
      this.setState({openDialog: false});
    }

    handleOpenDialogDelete(){
        this.setState({openDialogDelete: true});
    }
  
    handleCloseDialogDelete(){
        this.setState({openDialogDelete: false});
    }
    createMagnet(){
        console.log(this.state.magnets);
        console.log(this.state.newMagnet);
        this.state.magnets.push({text:this.state.newMagnet});
        console.log(this.state.magnets);
        this.setState({openDialog:false});
    }
    deleteMagnet(){
        this.setState({openDialogDelete:false});
        for( let i = 0;i<this.state.magnets.length;i++){
            if(this.state.magnets[i].text==this.state.deleteMagnet){
                this.state.magnets.splice(i,1);
            }
        }
    }
    printMagnets() {
        return this.state.magnets.map((magnet) => {
            console.log(magnet.text);
            return (
              <Typography variant='h6' style={{fontFamily: 'Monospace'}}>
              <p>{magnet.text}</p>
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
                <DialogTitle data-testid="createPopup">Add Magnet</DialogTitle>
                <DialogContent>
                  <TextField data-testid="createMagTxt"onChange={(event) => this.setState({newMagnet: event.target.value})} label={"Magnet Text"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="createMagSubmitBtn" onClick={this.createMagnet} style={{marginRight: '55px'}}>
                    Create Magnet
                  </Button>
                  <Button data-testid="closeCreatePopup" onClick={this.handleCloseDialog}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog data-testid="deletePopup" open={this.state.openDialogDelete} onClose={this.handleCloseDialogDelete}>
                <DialogTitle>Delete Magnet</DialogTitle>
                <DialogContent>
                  <TextField data-testid="deleteMagtxt" onChange={(event) => this.setState({deleteMagnet: event.target.value})} label={"Magnet Text"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="deleteMagSubmitBtn" onClick={this.deleteMagnet} style={{marginRight: '55px'}}>
                    Delete Magnet
                  </Button>
                  <Button onClick={this.handleCloseDialogDelete}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              <Typography variant='h3' style={{marginRight: '260px', marginTop: '60px', fontFamily: 'Monospace'}}>
                <em><b data-testid="title">Board</b></em>
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
                    {this.printMagnets()}
                  </Typography>
              </div>

              <Button data-testid="addMagnetBtn" style={{marginLeft: '265px', marginTop: '10px'}} onClick={this.handleOpenDialog}>
                Add magnet
              </Button>
              <Button data-testid="deleteMagnetBtn" style={{marginLeft: '265px', marginTop: '10px'}} onClick={this.handleOpenDialogDelete}>
                Delete magnet
              </Button>
            </div>

          </div>
        );
    }
}
export default Board;
