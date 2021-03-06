import React from 'react';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton} from '@material-ui/core';
import {ArrowBack, Backup, FileCopy, Person, TextFields, Image} from '@material-ui/icons';
import {Rnd} from 'react-rnd';

import './App.css';
import './image.css';

class Board extends React.Component {

    constructor(props) {
        super(props);

        var { boardName } = this.getBoardName(); //get boardName from URL 

        this.handleOpenLogoutDialog=this.handleOpenLogoutDialog.bind(this);
        this.handleCloseLogoutDialog=this.handleCloseLogoutDialog.bind(this);
        this.logout=this.logout.bind(this);

        this.backbutton=this.backbutton.bind(this);

        this.handleOpenTextDialog=this.handleOpenTextDialog.bind(this);
        this.handleCloseTextDialog=this.handleCloseTextDialog.bind(this);
        this.createMagnetText=this.createMagnetText.bind(this);
        this.removeText=this.removeText.bind(this);

        this.printMagnets=this.printMagnets.bind(this);
        this.loadBoard=this.loadBoard.bind(this);

        this.getBoardName=this.getBoardName.bind(this);
        this.getMaxIndex = this.getMaxIndex.bind(this);

        //photo part
        this.handleOpenPhotoDialog = this.handleOpenPhotoDialog.bind(this);
        this.handleClosePhotoDialog = this.handleClosePhotoDialog.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.uploadMagnetPhoto = this.uploadMagnetPhoto.bind(this);
        this.loadImage=this.loadImage.bind(this);
        this.printImages = this.printImages.bind(this);
        this.removeImage = this.removeImage.bind(this);

        //View Members
        this.handleOpenMembersDialog = this.handleOpenMembersDialog.bind(this); 
        this.handleCloseMembersDialog = this.handleCloseMembersDialog.bind(this);
        this.getMemberList = this.getMemberList.bind(this);
        this.printMemberList = this.printMemberList.bind(this);
        this.handleOpenNewMembersDialog = this.handleOpenNewMembersDialog.bind(this);
        this.handleCloseNewMembersDialog = this.handleCloseNewMembersDialog.bind(this);

        //custom placement for text
        this.handleWillPlaceText = this.handleWillPlaceText.bind(this);
        this.placeMagnet = this.placeMagnet.bind(this);
        this.handleShadowMouse = this.handleShadowMouse.bind(this);
        this.printShadow = this.printShadow.bind(this);


        this.addMember = this.addMember.bind(this);

        this.state = {
          tempBoardName : boardName,
          newMagnetText : '',
          newMemberIdText : '',
          imageFile: null,
          tempImageController: false,
          magnets: [], //will have title, content, type?, position{x: y: }
          images: [],
          logoutDialog: false,
          MemberList: [],
          willPlace: 0,
          newMagX: 0,
          newMagY: 0,
          mousePos: {x: 0, y: 0},
          tempImageX: 0,
          tempImageY: 0,
          tempTextX: 0,
          tempTextY: 0,
        };
    }

    componentDidMount(){
      console.log("mount function running");
      this.loadImage();
      this.loadBoard();
      this.getMemberList();
    }

    getMaxIndex() {
      let indexMax = 0;
      let i;
      //console.log("mag array length " + this.state.magnets.length);
      for (i = 0; i < this.state.magnets.length; i++) {
        if (this.state.magnets[i].index > indexMax) {
          console.log("index of " + this.state.magnets[i].index);
          indexMax = this.state.magnets[i].index;
        }
      }
      this.state.maxIndex = indexMax;
      console.log("max index is " + this.state.maxIndex);
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
      this.setState({openTextDialog: true})
    }

    handleCloseTextDialog() {
      this.setState({openTextDialog: false});
    }

    loadBoard(){
      fetch(this.state.tempBoardName+'/getAllMagnet')
        .then(async response => {
          var tempMagList = [];
          const data = await response.json();
          if (data != null) {
            for (var i = 0; i < data.length; i++) {
              // let posX = Math.random() * 250; 
              // let posY = Math.random() * 300;
              let tempMagnet = {index: "", content: "", position: ""};
              tempMagnet.index = Number(data[i].magnetName);
              tempMagnet.content = data[i].textMagnet;
              tempMagnet.position = {x: data[i].xPosition, y: data[i].yPosition};
              tempMagList.push(tempMagnet);
            }
            console.log("board loaded", tempMagList);
            this.setState({magnets: tempMagList});
            this.getMaxIndex();
          }
          else {
            console.log("board not loaded");
          }
          });
    }

    handleWillPlaceText(e) {
      if (this.state.newMagnetText != "") {
        var offsets = document.getElementById('action-window').getBoundingClientRect();
        var top = offsets.top;
        var left = offsets.left;
        this.setState({openNewDialog:false});
        this.setState({openTextDialog:false});
        this.setState({willPlace : 1});
        this.setState({mousePos : { x: e.clientX - left, y: e.clientY}});
        console.log("waiting for click place");

      }
      else {
        alert("Text magnet must contain text");
      }
    }

    handleShadowMouse(e) {
      if (this.state.willPlace) {
        var offsets = document.getElementById('action-window').getBoundingClientRect();
        var top = offsets.top;
        var left = offsets.left;
        console.log(`Position: (${e.clientX}, ${e.clientY})`);
        let mousePosX = e.clientX;
        let mousePosY = e.clientY;
        this.setState({mousePos : { x: mousePosX - left, y: mousePosY}});
      }
    }

    printShadow() {
      const shadowStyle = {
        position: 'absolute',
        left: this.state.mousePos.x,
        top: this.state.mousePos.y,
        backgroundColor: grey[50],
        border: "1px solid black",
        maxWidth : 250
      }
      if (this.state.willPlace) {
        return(
        <div id = 'shadowBox' style = {shadowStyle}>
          <Typography variant='h6' style={{fontFamily: 'Monospace'}}>
            {this.state.newMagnetText}
        </Typography>
        </div>
        )
      }
    }

    placeMagnet(e) {
      console.log("checking to place");
      if (this.state.willPlace) {
        var offsets = document.getElementById('mainBoard').getBoundingClientRect();
        var top = offsets.top;
        var left = offsets.left;
        console.log(`Position: (${e.clientX}, ${e.clientY})`);
        let newMagX = e.clientX;
        let newMagY = e.clientY;
        this.createMagnetText(newMagX - left, newMagY - top);
      }
    }
    
    createMagnetText(xPos, yPos) {
      console.log(this.state.tempBoardName);
      console.log(this.state.newMagnetText);
        this.state.magnets.push({index:this.state.maxIndex +1, content: this.state.newMagnetText, position: {x: xPos, y: yPos}});
        this.setState({willPlace : 0});
        try{
          fetch(this.state.tempBoardName+'/addMagnet', {
            method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                boardName: this.state.tempBoardName,
                magnetName: (this.state.maxIndex + 1).toString(), //formerly magnet title on frontend
                textMagnet: this.state.newMagnetText,
                xPosition: xPos,
                yPosition: yPos
              }),
            });
            console.log("saving magnet frontend");
        }
        catch(e){
          console.log(e);
        }
        this.state.newMagnetText="";
        this.setState({maxIndex: this.state.maxIndex +1});
    }

    removeText(indexDel) {
      var magArr = this.state.magnets;
      for(let i=0; i<this.state.magnets.length; i++) {
        if(this.state.magnets[i].index == indexDel) {
          magArr.splice(i, 1);
          console.log("found magnet to delete by perm index");
        }
      }
      try{
        fetch(this.state.tempBoardName+'/deleteMagnet', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              boardName: this.state.tempBoardName,
              magnetName: indexDel.toString()
            }),
          });
          console.log("delete text magnet frontend");
      }
      catch(e){
        console.log(e);
      }
      this.setState({magnets: magArr});
    }

    printMagnets() {
        return this.state.magnets.map((magnet, i) => {
            return ( //ideally this will have a hover on mouse until click for placement. doing random for now.
              <Rnd
              key = {magnet.index}
              default = {{ x: magnet.position.x, y: magnet.position.y}} //sets initial position, first assigned and stored in create-magnet-text
              maxWidth = {250}
              bounds = {"parent"}
              enableResizing = {false}
              onDragStop={(d)=> {
                //this.setState({tempTextX: d.x, tempTextY: d.y}) //passing d which has needed position and offsets of magnet
                this.saveTextPosition(d, magnet.index)
              }}
              >
                <div style = {{backgroundColor: grey[50]}} class = "img-wrap">
                  <Typography variant='h6' style={{fontFamily: 'Monospace'}}>{magnet.content}
                  </Typography>
                  <span class="close" onClick={(e)=>this.removeText(magnet.index)}>x</span>
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
        fetch(this.state.tempBoardName + '/uploadImage', {
          method: 'POST',
          body: formData,
        })
        .then(console.log("Image uploaded"))
        this.setState({ tempImageController: false})
        this.setState({ tempImageX: leftSpot, tempImageY: topSpot}) 
      }
      console.log("Checkpoint")
      this.handleClosePhotoDialog();  
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
      console.log("Start loading")
      fetch(this.state.tempBoardName + '/getImage')
      .then(async response => {
        var tempImageList = [];
        const data = await response.json();
        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            console.log(data.length + " this is length of data")
            let tempImage = {url: "", position: ""};
            tempImage.url = data[i].imageName;
            tempImage.position = {x: data[i].xPosition, y: data[i].yPosition};
            console.log(data[i].xPosition)
            console.log(data[i].yPosition)
            tempImageList.push(tempImage);
          }
          console.log("we have Images", tempImageList);
          this.setState({images: tempImageList});
        }
        else {
          console.log("we don't have images");
        }
      })
      return 1;
    }

    printImages() {
      return this.state.images.map((image) => {
        var tempURL = "/images/" + image.url;
        var tempNameWithFileFormat = image.url;
          return (
              <Rnd
                key = {image.url}
                default={{ x: image.position.x, y: image.position.y, width: 150, height: 100 }}
                minWidth={150}
                minHeight={100}
                enableResizing = {false}
                onDragStop={(d)=> {
                  this.setState({tempImageX: d.x, tempImageY: d.y})
                  this.savePosition(d, image.url)
                }}
              >
                {console.log("image X pos: ", this.state.tempImageX)}
                {console.log("image Y pos: ", this.state.tempImageY)}
                  <div class="img-wrap">
                    <span class="close" onClick={(e)=>this.removeImage(tempNameWithFileFormat)}>x</span>
                    <img src ={tempURL} width = {"100%"} max-width = {"300"}/>
                  </div>
              </Rnd>
          )
      });
  }

  //member views part 
  handleOpenMembersDialog() {
    this.setState({openMemberDialog:true});
  }
  
  handleCloseMembersDialog() {
    this.setState({openMemberDialog:false});
  }

  handleOpenNewMembersDialog() {
    this.setState({openNewMembersDialog:true});
  }

  handleCloseNewMembersDialog() {
    this.setState({openNewMembersDialog:false});
  }

  getMemberList() {
    console.log("Start");
    var tempMemberList = [];
    fetch(this.state.tempBoardName + '/getUsers')
    .then(console.log("get Member list"))
    .then(response=>response.json())
    .then(data => {
      console.log(data.length)
      for(var i=0; i<data.length; i++) {
        tempMemberList.push(data[i])
      }
      this.setState({MemberList:tempMemberList})
    })
    console.log("End");
  }

  printMemberList() {
    return (
      this.state.MemberList.map((member) => 
        <Typography key = {member.userID} data-testid="friendlist" variant='h5' style={{fontFamily: 'Monospace', marginTop: '10px', align: 'left'}}>
          {member.userID}
        </Typography>
      )
    )
  }

  addMember() {
      //var tempURL = this.getBoardName + '/addBoardShare'
      console.log(this.state.newMemberIdText);
      try{
        fetch(this.tempBoardName + '/addBoardShare', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userID: this.state.newMemberIdText,
              boardName:this.state.tempBoardName
            }),
          }).then(async response => {
            const data = await response.json();
            console.log(data);
            console.log(data.status);
            if(data.status == true) {
              var members = this.state.MemberList;
              let newMember = {userID : this.state.newMemberIdText}
              members.push(newMember);
              this.setState({MemberList: members});
              this.setState({newMemberIdText: ''});
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
    this.handleCloseNewMembersDialog();
    //this.handleCloseMembersDialog;
  }

  //save position
  savePosition(e, name) {
    var divOffsets = document.getElementById('mainBoard').getBoundingClientRect();
    var totalLeftOffset = divOffsets.left + e.offsetX;
    var totalTopOffset = divOffsets.top + e.offsetY;
    fetch(this.state.tempBoardName + '/updateImagePosition', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageName: name,
        xPosition: e.clientX - totalLeftOffset,
        yPosition: e.clientY - totalTopOffset
      }),
    })
    this.setState({ imageFile : null})
    console.log("save position!")
  }

  saveTextPosition(e, name) {
    var divOffsets = document.getElementById('mainBoard').getBoundingClientRect();
    
    var totalLeftOffset = divOffsets.left + e.offsetX;
    var totalTopOffset = divOffsets.top + e.offsetY;

    fetch(this.state.tempBoardName + '/updateMagnetPosition', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        magnetName: name,
        xPosition: e.clientX - totalLeftOffset,
        yPosition: e.clientY - totalTopOffset
      }),
    })
    console.log("save position!")
  }

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
            }}
            id = {"action-window"
            }>
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
                    <Button variant='contained' style={{marginRight: '85px', backgroundColor: red[200]}} onClick={this.logout}>
                      Logout
                    </Button>
                    <Button variant='contained' onClick={this.handleCloseLogoutDialog}>
                      Back
                    </Button>
                  </DialogActions>
                </Dialog>
                
              {/*Dialog for text content ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
              <Dialog open={this.state.openTextDialog} onClose={this.handleCloseTextDialog}>
                <DialogTitle data-testid="createTextPopup"><u>Enter Text</u></DialogTitle>
                <DialogContent>
                  <TextField multiline rows={4}
                            data-testid="createMagTxtContent"
                            onChange={(event) => this.setState({newMagnetText: event.target.value})}
                            label={"Magnet Text"}/>
                            <br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="createMagTextSubmitBtn" variant='contained' onClick={e=>this.handleWillPlaceText(e)} style={{marginRight: '12px'}}>

                    Post Text
                  </Button>
                  <Button data-testid="closeCreateTextPopup" variant='contained' onClick={this.handleCloseTextDialog}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Dialog for photo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
              <Dialog open={this.state.openPhotoDialog} onClose={this.handleClosePhotoDialog}>
                <DialogTitle data-testid="createPhotoPopup" ><u>Upload Photo</u></DialogTitle>
                <DialogContent>
                    {/* <input type="file" name="file" onChange = {e=>this.handleFileInput(e)}/> */}
                    {/* <Button type="button" onClick={this.uploadMagnetPhoto()}>Upload</Button> */}
                    <input style={{display: 'none'}} type="file" onChange={e=>this.handleFileInput(e)} ref={fileInput => this.fileInput = fileInput}/>
                    <div style={{
                         display: 'flex',
                         flexDirection: 'column'
                    }}>
                      <Button variant='outlined' onClick={() => this.fileInput.click()}>Pick File <FileCopy style={{marginLeft:'5px'}}/></Button><br></br>
                      <Button variant='outlined' onClick={() => this.uploadMagnetPhoto()}>Upload <Backup style={{marginLeft:'5px'}}/></Button><br></br>
                    </div>
                    {/* <Button onClick={() => this.doTogether()}>Upload</Button> */}
                    {/* .then(this.savePosition(leftSpot, topSpot, this.state.imageFile.name)) */}
                </DialogContent>
                <DialogActions>
                  <Button data-testid="closeCreatePhotoPopup" variant='contained' onClick={this.handleClosePhotoDialog}>Back</Button>
                </DialogActions>
              </Dialog>

              {/*Prompt to add new member id*/}
              <Dialog open = {this.state.openNewMembersDialog} onClose = {this.handleCloseNewMembersDialog}>
                  <DialogTitle data-testid="addMembersPopup">Add Member</DialogTitle>
                  <DialogContent>
                  <TextField data-testid="AddMemberIdTextEntry"onChange={(event) => this.setState({newMemberIdText: event.target.value})} label={"Member name"}/><br></br>
                </DialogContent>
                <DialogActions>
                  <Button data-testid="submitAddMemberId" onClick={this.addMember} style={{marginRight: '0px'}}>
                    Add
                  </Button>
                  <Button data-testid="closeAddMembersPopup" onClick={this.handleCloseNewMembersDialog}>
                    Back
                  </Button>
                </DialogActions>  
              </Dialog>

              {/* Dialog for member view  */}
              <Dialog open={this.state.openMemberDialog} onClose={this.handleCloseMembersDialog}>
                <DialogTitle data-testid="viewMembersPopup"><u>Board Member List</u></DialogTitle>
                <DialogContent style={{overflowY: 'scroll', backgroundColor: grey[100], marginLeft: '5px', width: 295, height: 350}}>
                  {this.printMemberList()}
                </DialogContent>
                <DialogActions>
                  <Button data-testid="addMemberButton" variant='contained' style={{backgroundColor: green[200], marginRight: '105px', display: 'flex'}} onClick={this.handleOpenNewMembersDialog}>
                    Add member
                  </Button>
                  <Button data-testid="closeMembersPopup" variant='contained' style = {{marginLeft: '30px', display: 'flex'}} onClick={this.handleCloseMembersDialog}>
                    Back
                  </Button>
                </DialogActions>
              </Dialog>
              

              <IconButton style={{position: "absolute",left: 0,top:"5vh"}} onClick={this.backbutton}>
                <ArrowBack />
              </IconButton>
              <div style={{width: 400, marginBottom: '20px', display: 'inline-block'}}>
                <Typography variant='h3' style={{marginTop: '10px', paddingBottom: '0px', fontFamily: 'Monospace', textAlign: 'left', marginLeft: '5px'}}>
                  <em><b data-testid="title">{this.state.tempBoardName}</b></em>
                  <Button data-testid="viewMembersBtn" variant='contained' style={{float:'right', marginRight:'5px'}} onClick = {this.handleOpenMembersDialog}>
                  Members <Person style={{marginLeft:'5px'}}/>
                </Button>
                </Typography>
              </div>

              <div style={{
                height: 560,
                width: 400,
                marginTop: '-10px',
                display: 'flex',
                backgroundColor: grey[100],
                flexDirection: 'column',
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
                borderTop: '1px solid black',
                borderBottom: '1px solid black'
                }}
                id = {"mainBoard"}
                onMouseMove = {e=>this.handleShadowMouse(e)}
                onClick = {e=>this.placeMagnet(e)}
              >
                    {this.printMagnets()}
                    {this.printImages()}
                    {this.printShadow()}
              </div>
              <div style={{
              width: 500,
              display: 'flex'
              }}>
              <Button data-testid="addTextMagnetBtn" variant='contained' style={{marginLeft: '82px', marginTop: '10px'}} onClick={this.handleOpenTextDialog}>
                Add Text <TextFields style={{marginLeft:'5px'}} />
              </Button>
              &nbsp;
              <Button data-testid="addPhotoMagnetBtn" variant='contained' style={{marginLeft: '50px', marginTop: '10px'}} onClick={this.handleOpenPhotoDialog}>
                Add Photo <Image style={{marginLeft:'5px'}} />
              </Button>
            </div></div>
          </div>
        );
    }
}
export default Board;

