import React from 'react';

import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Rnd} from 'react-rnd';
import {Draggable} from 'react-draggable';

import './App.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenNewDialog=this.handleOpenNewDialog.bind(this);
        this.handleCloseDialog=this.handleCloseDialog.bind(this);
        this.handleOpenDialogDelete=this.handleOpenDialogDelete.bind(this);

        this.handleOpenTextDialog=this.handleOpenTextDialog.bind(this);
        this.handleCloseTextDialog=this.handleCloseTextDialog.bind(this);

        this.handleCloseDialogDelete=this.handleCloseDialogDelete.bind(this);
        this.createMagnet=this.createMagnet.bind(this);

        this.createMagnetText=this.createMagnetText.bind(this);

        this.deleteMagnet=this.deleteMagnet.bind(this);
        this.printMagnets=this.printMagnets.bind(this);
        this.state = {
            magnets: [] //will have title and content
        };
    }

    handleOpenNewDialog(){
      this.setState({openNewDialog: true});
    }

    handleCloseDialog(){
      this.setState({openNewDialog: false});
    }

    handleOpenDialogDelete(){
        this.setState({openDialogDelete: true});
    }

    handleOpenTextDialog() {
      this.setState({openTextDialog: true});
    }

    handleCloseTextDialog() {
      this.setState({openTextDialog: false});
    }
  
    handleCloseDialogDelete(){
      this.setState({openDialogDelete: false});
    }

    createMagnet(){
        //console.log(this.state.magnets);
        //console.log(this.state.newMagnet);
        //this.state.magnets.push({title:this.state.newMagnetTitle, content: ''}); **PUSH OCCURS AFTER CONTENT IS OBTAINED
        //console.log(this.state.magnets);
        this.setState({openTextDialog:true});
    }

    createMagnetText() {
      console.log(this.state.magnets);
      console.log(this.state.newMagnetText);
      this.state.magnets.push({title:this.state.newMagnetTitle, content: this.state.newMagnetText});
      console.log(this.state.magnets);
      this.setState({openNewDialog:false});
      this.setState({openTextDialog:false});
      this.state.newMagnetTitle="";
      this.state.newMagnetText="";
    }

    deleteMagnet(){
        this.setState({openDialogDelete:false});
        for( let i = 0;i<this.state.magnets.length;i++){
            if(this.state.magnets[i].title==this.state.deleteMagnet){
                this.state.magnets.splice(i,1);
            }
        }
    }
    printMagnets() {
        return this.state.magnets.map((magnet) => {
            console.log(magnet.title);
            return (
              <Rnd
              //size = {300}
              minWidth = {50}
              maxWidth = {200}
              bounds = {"parent"}
              enableResizing = 
                {{top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}
              >
                <div style = {{backgroundColor: grey[50]}}>
                  <Typography variant='h5' style={{fontFamily: 'Monospace'}}>
                    {magnet.title}:{magnet.content}
                  </Typography>
                </div>
              </Rnd>
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
              <Dialog open={this.state.openNewDialog} onClose={this.handleCloseDialog}>
                <DialogTitle data-testid="createPopup">Add Magnet</DialogTitle>
                <DialogContent>
                  <TextField data-testid="createMagTxt"onChange={(event) => this.setState({newMagnetTitle: event.target.value})} label={"Magnet Title"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="createMagSubmitBtn" onClick={this.createMagnet} style={{marginRight: '10px'}}>
                    Create Text Magnet
                  </Button>
                  
                  {/* This button has no handlers ++ Test id's will need to be narrowed*/}
                  <Button data-testid="createMagSubmitBtn" onClick={this.createMagnet} style={{marginRight: '10px'}}>
                    Create Photo Magnet
                  </Button>
                  
                  <Button data-testid="closeCreatePopup" onClick={this.handleCloseDialog}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>

              {/*Dialog for text content*/}
              <Dialog open={this.state.openTextDialog} onClose={this.handleCloseTextDialog}>
                <DialogTitle data-testid="createTextPopup">Enter Text</DialogTitle>
                <DialogContent>
                  <TextField data-testid="createMagTxtContent"onChange={(event) => this.setState({newMagnetText: event.target.value})} label={"Magnet Text"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="createMagTextSubmitBtn" onClick={this.createMagnetText} style={{marginRight: '55px'}}>
                    Post Text
                  </Button>
                  <Button data-testid="closeCreateTextPopup" onClick={this.handleCloseTextDialog}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog open={this.state.openDialogDelete} onClose={this.handleCloseDialogDelete}>
                <DialogTitle data-testid="deletePopup">Delete Magnet</DialogTitle>
                <DialogContent>
                  <TextField data-testid="deleteMagtxt" onChange={(event) => this.setState({deleteMagnet: event.target.value})} label={"Magnet Text"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="deleteMagSubmitBtn" onClick={this.deleteMagnet} style={{marginRight: '55px'}}>
                    Delete Magnet
                  </Button>
                  <Button data-testid="closeDeletePopup" onClick={this.handleCloseDialogDelete}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              <Typography variant='h3' style={{marginRight: '260px', marginTop: '60px', paddingBottom: '10px', fontFamily: 'Monospace'}}>
                <em><b data-testid="title">Board</b></em>
              </Typography>
              
              <div style={{
                height: 500,
                width: 400,
                display: 'flex',
                backgroundColor: blue[25],
                flexDirection: 'column',
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
                borderTop: '1px solid black',
                borderBottom: '1px solid black',
              }}>
                <div style={{
                height: 500,
                
                display: 'flex',
                flexDirection: 'column'}}>
                    {this.printMagnets()}
                </div>
              </div>

              <Button data-testid="addMagnetBtn" style={{marginLeft: '265px', marginTop: '10px'}} onClick={this.handleOpenNewDialog}>
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
