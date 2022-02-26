import React from 'react';
import Toggler from './Toggler';
import '../App.css';
import { BiPlay, BiPause, BiUndo } from 'react-icons/bi'




class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      brklen: 5,
      seshlen: 25,
      remainingSec: 1500,
      timertitle: "session",
      timerstatus: "session",
      countstatus: "pause",
      intervalID: ""
      
      
    }
    
    this.setLength=this.setLength.bind(this)
    this.setTimer=this.setTimer.bind(this)
    this.reset=this.reset.bind(this)
    this.playSound=this.playSound.bind(this)
    this.tick=this.tick.bind(this)

  }
  
  
  
  playSound(){
    console.log("beep beep")
  }
  
  setLength(direction, type, seshType)
  {
    if(this.state.countstatus=='pause')
{
    if(direction=='up')
      { 
        switch(type){
          case "brk":
            console.log("brk length up")
            this.setState({brklen: this.state.brklen+1
                          }, ()=>{if(seshType=='break')
              {this.setState({remainingSec:this.state.brklen*60})};});
            break;
               
          case "sesh":
            console.log("sesh length up")
            this.setState({seshlen: this.state.seshlen+1},()=>{
              if(seshType=='session')
             {this.setState({remainingSec:this.state.seshlen*60});
              }
            });
           
      }
      }
    if(direction=='down')
      {
         switch(type){
         case "brk":
            this.setState({brklen: this.state.brklen-1}, ()=>{
              if(seshType=='break')
              {this.setState({remainingSec:this.state.brklen*60})};});
            
                  
            break;
             
          case "sesh":
            this.setState({seshlen: this.state.seshlen-1}, ()=>{
              if(seshType=='session')
             {this.setState({remainingSec:this.state.seshlen*60});
            }});
             
  }//switch"type"
      }//direction "down"
  }
}//setlength
  
  handleTimeout()
     {   
            const sesh = this.state.timerstatus=='session';
            const brk = this.state.timerstatus=='break';
            console.log("timeout")
            if(sesh)
            {
              this.playSound();
              this.setState({timerstatus:'break',
                           timertitle:'break',
                           remainingSec: this.state.brklen*60
                            },
                           
                           ()=>{this.setTimer(); }
                           )
              this.setTimer();
              
            }
          
           if(brk)
             {
               this.setState({timerstatus:'session',
                              timertitle:'session',
                              remainingSec:this.state.seshlen*60,
                              },  
                             ()=>{this.setTimer(); 
                                  })
               this.setTimer();
          
             
             }         
   }
    
  
  tick(click, lastPoint){
       
       const timeout = this.state.remainingSec == 0;
    
       if(!timeout)
                {   console.log("tick running " + this.state.remainingSec)
                    this.setState({remainingSec: Math.round(lastPoint-((Date.now()-click)/1000))});
                  }                                      
  
      if(timeout)
         {
           this.handleTimeout()
         }
        
  } 

  
  

  
  //toggle-between-play-and-pause
  
  setTimer(){
        const click=Date.now();
        const lastPoint = this.state.remainingSec;
    
        switch(this.state.countstatus){
          case "pause":
            
              this.setState({countstatus:"play", intervalID: setInterval(()=>{this.tick(click, lastPoint)
            }, 1000) 
            });
              
            
            break;
        
            
          case "play":
            
             console.log("setTimer pause is run");
            this.setState({countstatus:"pause"}, ()=>{  clearInterval(this.state.intervalID)});
            }
  
  }
   
  
  
       
     
   
    
  reset(){
    clearInterval(this.state.intervalID);
    this.setState({ 
       brklen: 5,
      seshlen: 25,
      remainingSec: 1500,
      timertitle: "session",
      timerstatus: "session",
      countstatus: "pause",
      
     
                  })
  };
  
  render(){
    
    var displayMin = Math.floor(this.state.remainingSec/60);
    var displaySec = () =>{if(this.state.remainingSec=="0"||this.state.remainingSec%60==0)
                             {return "00"}
                             else{
                               return this.state.remainingSec%60;
                            }};;
    
    return(
<div>
    <h1>Productivity Clock</h1>
      <div id='setting'>

        
      <Toggler 
        title='session length'
        length={this.state.seshlen}
        clickup={()=>this.setLength('up', "sesh", this.state.timerstatus)}
        clickdown={()=>this.setLength('down', "sesh", this.state.timerstatus)}
        />
        
        <Toggler 
        title='break length'
        length={this.state.brklen}
        clickup={()=>this.setLength('up', "brk", this.state.timerstatus)}
        clickdown={()=>this.setLength('down', "brk", this.state.timerstatus)}
        />
        
      </div>
      
      <div id='timer'> 
        <h1>{this.state.timerstatus}</h1>
        <h2>{displayMin}:{displaySec()}</h2>
        <div id='controls'>
          <div onClick = {this.setTimer} id="playbutton" className='controlChild'>
          <BiPlay />


          <BiPause />
          </div>

          

          <div onClick = {this.reset} id='resetbutton' className='controlChild'>
          <BiUndo />
          </div>
          
          </div>
        </div>
        
</div>
    )

  }//render
}//component






export default App;
