import React from 'react';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton} from '@material-ui/core';
import { sizing } from '@material-ui/system';
import {ArrowBack} from '@material-ui/icons';
import Image from "material-ui-image";
import {Rnd} from 'react-rnd';

import './App.css';
import './image.css';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.handleOpenLogoutDialog=this.handleOpenLogoutDialog.bind(this);
        this.handleCloseLogoutDialog=this.handleCloseLogoutDialog.bind(this);
        this.logout=this.logout.bind(this);

        this.backbutton=this.backbutton.bind(this);
        this.handleOpenNewDialog=this.handleOpenNewDialog.bind(this);
        this.handleCloseDialog=this.handleCloseDialog.bind(this);
        this.handleOpenDialogDelete=this.handleOpenDialogDelete.bind(this);

        this.handleOpenTextDialog=this.handleOpenTextDialog.bind(this);
        this.handleCloseTextDialog=this.handleCloseTextDialog.bind(this);

        this.handleCloseDialogDelete=this.handleCloseDialogDelete.bind(this);


        this.createMagnetText=this.createMagnetText.bind(this);

        this.deleteMagnet=this.deleteMagnet.bind(this);
        this.printMagnets=this.printMagnets.bind(this);
        this.loadBoard=this.loadBoard.bind(this);
      
        this.saveBoard=this.saveBoard.bind(this);
        this.getBoardName=this.getBoardName.bind(this);

        //photo part
        this.handleOpenPhotoDialog = this.handleOpenPhotoDialog.bind(this);
        this.handleClosePhotoDialog = this.handleClosePhotoDialog.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.uploadMagnetPhoto = this.uploadMagnetPhoto.bind(this);
        this.loadImage=this.loadImage.bind(this);
        this.printImages = this.printImages.bind(this);
        this.removeImage = this.removeImage.bind(this);

        var { boardName } = this.getBoardName(); //get boardName from URL 

        this.state = {
          tempBoardName: boardName,
          newMagnetTitle : '', newMagnetText : '', deleteMagnet : '',
          imageFile: null,
          tempImageController: false,
          magnets: [], //will have title, content, type?, position{x: y: }
          images: [],
          logoutDialog: false,
        };
        this.loadBoard();
        this.loadImage();
    }

    getBoardName() {
      let retVal = "test";
      if (this.props.match)
        retVal = this.props.match.params;
      else console.log("WARNING no live board name");
      return retVal;
    }
    
    backbutton(){
      this.props.history.push({
        pathname: '/boardselection',
        state: { detail: this.props.location.state.detail }
      });
    }

    logout(){
      this.setState({logoutDialog: false});
      this.props.history.push({pathname: '/login'});
    }
    handleOpenLogoutDialog(){
      this.setState({logoutDialog: true});
    }

    handleCloseLogoutDialog(){
      this.setState({logoutDialog: false});
    }

    handleOpenNewDialog(){
      this.setState({openNewDialog: true});
    }

    handleCloseDialog(){
      this.setState({openNewDialog: false});
      this.state.newMagnetTitle="";
    }

    handleOpenDialogDelete(){
        this.setState({openDialogDelete: true});
    }

    handleOpenTextDialog() {
      let i;
      let uniq = 1;
      for (i = 0; i < this.state.magnets.length; i++) {
        if (this.state.newMagnetTitle == this.state.magnets[i].title) {
          alert("That title is taken");
          uniq = 0;
        }
      }
      if (uniq) this.setState({openTextDialog: true})
    }

    handleCloseTextDialog() {
      this.setState({openTextDialog: false});
    }
  
    handleCloseDialogDelete(){
      this.setState({openDialogDelete: false});
    }

    loadBoard(){
      fetch(this.state.tempBoardName+'/getAllMagnet')
        .then(async response => {
          var tempMagList = [];
          const data = await response.json();
          if (data != null) {
            for (var i = 0; i < data.length; i++) {
              let posX = Math.random() * 250; //how to get magnet size for safer placement?
              let posY = Math.random() * 300;
              let tempMagnet = {title: "", content: "", position: ""};
              tempMagnet.title = data[i].magnetName;
              tempMagnet.content = data[i].textMagnet;
              tempMagnet.position = {x: posX, y: posY};
              tempMagList.push(tempMagnet);
            }
            console.log("we have something", tempMagList);
            this.setState({magnets: tempMagList});
          }
          else {
            console.log("we don't have something");
          }
          });
    }

    saveBoard(){
      const magState = this.state.magnets;
      this.setState({magnets:magState});
      console.log("saving");
      console.log(this.state.magnets);
    }

    createMagnetText() {
      console.log(this.state.tempBoardName);
      console.log(this.state.magnets);
      console.log(this.state.newMagnetText);
      var leftSpot = Math.random() * 250; //how to get magnet size for safer placement?
      var topSpot = Math.random() * 300;
      this.state.magnets.push({title:this.state.newMagnetTitle, content: this.state.newMagnetText, position: {x : leftSpot, y: topSpot}});
      console.log(this.state.magnets);
      this.setState({openNewDialog:false});
      this.setState({openTextDialog:false});
      try{
        fetch(this.state.tempBoardName+'/addMagnet', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              boardName: this.state.concrete_boardID,
              magnetName: this.state.newMagnetTitle,
              textMagnet: this.state.newMagnetText
            }),
          });
          console.log("saving magnet frontend");
      }
      catch(e){
        console.log(e);
      }
      this.state.newMagnetTitle="";
      this.state.newMagnetText="";
    }

    deleteMagnet(){
      let found = 0;
        this.setState({openDialogDelete:false});
        for( let i = 0;i<this.state.magnets.length;i++){
            if(this.state.magnets[i].title==this.state.deleteMagnet){
                this.state.magnets.splice(i,1);
                found = 1;
            }
        }
        if (!found) alert("That magnet doesn't exist.");
        //removing from db
        try{
          fetch(this.state.tempBoardName+'/deleteMagnet', {
            method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                boardName: this.state.concrete_boardID,
                magnetName: this.state.deleteMagnet
              }),
            });
            console.log("delete magnet frontend");
        }
        catch(e){
          console.log(e);
        }
    }

    printMagnets() {
        return this.state.magnets.map((magnet) => {
            return ( //ideally this will have a hover on mouse until click for placement. doing random for now.
              <Rnd
              default = {{ x: magnet.position.x, y: magnet.position.y}} //sets initial position, first assigned and stored in create-magnet-text
              minWidth = {50}
              maxWidth = {250}
              bounds = {"parent"}
              enableResizing = {false}
              onDragStop={ (d) => {magnet.position = {x : d.x, y : d.y} } } //after every move, magnet coords reassigned. state isn't set in magnet (i think?) until save button is clicked.
              >
                <div style = {{backgroundColor: grey[50]}} id = "dragMag">
                  <Typography variant='h5' style={{fontFamily: 'Monospace'}}>
                    {magnet.title}: </Typography><Typography variant='h6' style={{fontFamily: 'Monospace'}}>{magnet.content}
                  </Typography>
                </div>
              </Rnd>
            )
        });
    }

    //photo part (by Dongwoo)
    handleOpenPhotoDialog() {
      this.setState({openPhotoDialog:true});
    }

    handleClosePhotoDialog() {
      this.setState({openPhotoDialog:false});
      this.setState({ imageFile : null});
    }

    handleFileInput(e) {
      this.setState({ imageFile : e.target.files[0]})
      console.log("HandleFileInput part")
      this.setState({tempImageController: true})
    }

    uploadMagnetPhoto() {
      console.log(this.state.imageFile);
      var leftSpot = Math.random() * 250; 
      var topSpot = Math.random() * 300;
      this.state.images.push({url: this.state.imageFile.name, position: {x : leftSpot, y: topSpot}});
      if(this.state.tempImageController) {
        console.log("uploadMagnetPhoto part");
        const formData = new FormData();
        formData.append('file', this.state.imageFile);
        try {
          fetch(this.state.tempBoardName + '/uploadImage', {
            method: 'POST',
            body: formData,
          })
          .then(console.log("Image uploaded"))
          this.setState({
            imageFile : null
          })
          this.setState({
            tempImageControllermp: false
          })
        } catch(e) {
          console.log(e);
        }
      }      
    }

    removeImage(name) {
      let index = 99;
      for(let i=0; i<this.state.images.length; i++) {
        if(this.state.images[i].url == name) {
          index = i;
          console.log("Length is " + this.state.images.length)
          console.log("Name is " + this.state.images[i].url)
          console.log(index);
          console.log(this.state.images[i].url)
          console.log(this.state.images[index].url)  
        }
      }
      fetch(this.state.tempBoardName + '/deleteImage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageName: this.state.images[index].url
        }),
      })
      console.log("Delete image:" + this.state.images[index].url);
      this.state.images.splice(index, 1);  

      //for re-rendering
      this.setState({
        images: this.state.images
      })
    } 


    loadImage() {
      fetch(this.state.tempBoardName + '/getImage')
      .then(async response => {
        var tempImageList = [];
        const data = await response.json();
        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            let posX = Math.random() * 250; //how to get magnet size for safer placement?
            let posY = Math.random() * 300;
            let tempImage = {url: "", position: ""};
            // temp = data[i].imageURL;
            tempImage.url = data[i].imageName;
            tempImage.position = {x: posX, y: posY};
            tempImageList.push(tempImage);
          }
          console.log("we have Images", tempImageList);
          this.setState({images: tempImageList});
        }
        else {
          console.log("we don't have something");
        }
      })
    }
    printImages() {
      return this.state.images.map((image) => {
        var tempURL = "/images/" + image.url;
        var tempNameWithFileFormat = image.url;
        var tempName = image.url.split('.')[0];
          return (
            <div style={{ width: "200px", height: "150px" }}>
              <Rnd
                default={{ x: image.position.x, y: image.position.y, width: 150, height: 100 }}
                minWidth={150}
                minHeight={100}
                enableResizing = {false}
                onDragStop={ (d) => {image.position = {x : d.x, y : d.y} } }
              >
                <div style={{ margin: 0, height: "100%", paddingBottom: "40px" }}>
                  <div class="img-wrap">
                    <span class="close" onClick={(e)=>this.removeImage(tempNameWithFileFormat)}>x</span>
                    <img src={tempURL}/>
                  </div>
                </div>
              </Rnd>
            </div> 
          )
      });
  }

  
//<Typography variant='h5' style={{fontFamily: 'Monospace'}}>{magnet.title}:</Typography>
//<Typography variant='h6' style={{fontFamily: 'Monospace'}}>{magnet.content}</Typography>
    render() {
      console.log(this.state);
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
              borderRight: '1px solid black',
              position: "relative",
            }}>
              <div style = {{height:"35px",width:"100%",borderBottom:"1px solid black",display:"flex",justifyContent:"space-between"}}>
              <Typography variant='h6' style={{fontFamily: 'Monospace',position:"relative",left:"1vh",width:"fit-content"}}>
                <em><b>Bit Magnet</b></em>
              </Typography>
              <Button style={{position:"relative",right:"1vh"}} onClick={this.handleOpenLogoutDialog}>
                Logout
              </Button>
              </div>
              {/* Logout dialog */}
              <Dialog open={this.state.logoutDialog} onClose={this.handleCloseLogoutDialog}>
                  <DialogTitle>Are you sure you would like to log out?</DialogTitle>
                  <DialogContent>
                  </DialogContent>
                  <DialogActions>
                    <Button style={{marginRight: '85px'}} onClick={this.logout}>
                      Logout
                    </Button>
                    <Button onClick={this.handleCloseLogoutDialog}>
                      Back
                    </Button>
                  </DialogActions>
                </Dialog>

              <Dialog open={this.state.openNewDialog} onClose={this.handleCloseDialog}>
                <DialogTitle data-testid="createPopup">Add Magnet</DialogTitle>
                <DialogContent>
                  <TextField data-testid="createMagTxt"onChange={(event) => this.setState({newMagnetTitle: event.target.value})} label={"Magnet Title"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="createMagSubmitBtn" onClick={this.handleOpenTextDialog} style={{marginRight: '10px'}}>
                    Text
                  </Button>
                  
                  {/* This button has no handlers ++ Test id's will need to be narrowed*/}

                  {/* For photo */}
                  <Button data-testid="createPhotoMagSubmitBtn" onClick={this.handleOpenPhotoDialog} style={{marginRight: '10px'}}>
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
                  <TextField multiline rows={4} data-testid="createMagTxtContent"onChange={(event) => this.setState({newMagnetText: event.target.value})} label={"Magnet Text"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="createMagTextSubmitBtn" onClick={this.createMagnetText} style={{marginRight: '0px'}}>
                    Post Text
                  </Button>
                  <Button data-testid="closeCreateTextPopup" onClick={this.handleCloseTextDialog}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Dialog for photo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
              <Dialog open={this.state.openPhotoDialog} onClose={this.handleClosePhotoDialog}>
                <DialogTitle data-testid="createPhotoPopup">Upload Photo</DialogTitle>
                <DialogContent>
                    {/* <input type="file" name="file" onChange = {e=>this.handleFileInput(e)}/> */}
                    {/* <Button type="button" onClick={this.uploadMagnetPhoto()}>Upload</Button> */}
                    <input style={{display: 'none'}} type="file" onChange={e=>this.handleFileInput(e)} ref={fileInput => this.fileInput = fileInput}/>
                    <Button onClick={() => this.fileInput.click()}>Pick File</Button>
                    <Button onClick={() => this.uploadMagnetPhoto()}>Upload</Button>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="closeCreatePhotoPopup" onClick={this.handleClosePhotoDialog}>
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
              <IconButton style={{position: "absolute",left: 0,top:"5vh"}} onClick={this.backbutton}>
                <ArrowBack />
              </IconButton>
              <Typography variant='h3' style={{marginRight: '260px', marginTop: '10px', paddingBottom: '10px', fontFamily: 'Monospace'}}>
                <em><b data-testid="title">Board</b></em>
              </Typography>
              
              <div style={{
                height: "75vh",
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
                height: "100%",
                display: 'flex',
                flexDirection: 'column'}}
                id = {"mainBoard"}
                >
                    {this.printMagnets()}
                    {this.printImages()}
                </div>
              </div>
              <div style={{
              width: 400,
              display: 'flex',
              marginRight: 50
              }}>
              <Button data-testid="addMagnetBtn" style={{marginLeft: '45px', marginTop: '10px'}} onClick={this.handleOpenNewDialog}>
                Add magnet
              </Button>
              <Button data-testid="deleteMagnetBtn" style={{marginLeft: '45px', marginTop: '10px'}} onClick={this.handleOpenDialogDelete}>
                Delete magnet
              </Button>
              <Button data-testid="saveMagnetBtn" style={{marginLeft: '45px', marginTop: '10px'}} onClick={this.saveBoard}>
                Save board
              </Button>
            </div></div>

          </div>
        );
    }
}
export default Board;
