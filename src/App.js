import React from 'react';
import './App.css';
import TimerContainer from './components/TimerContainer';

class App extends React.Component{
  constructor(props) {
    super(props)
    
    this.state={
      breaklen:5,
      sessionlen:25,
      clocklen:25*60,
      currentdisp:"Session",
      timeflag:1,
      clearintvar:undefined,
      breakflag:0
    }
    this.handleBreakDec=this.handleBreakDec.bind(this);
    this.handleSessionDec=this.handleSessionDec.bind(this);
    this.handleBreakInc=this.handleBreakInc.bind(this);
    this.handleSessionInc=this.handleSessionInc.bind(this);
    this.convertToMinutes=this.convertToMinutes.bind(this);
    this.handlePlayBut=this.handlePlayBut.bind(this);
    this.handleRefresh=this.handleRefresh.bind(this);
    this.timedec=this.timedec.bind(this);
    this.startbreak=this.startbreak.bind(this);
  }

  componentWillUnmount(){
    this.handleRefresh();
  }

  startbreak(){
    this.setState({
      breakflag:1,
      clocklen:this.state.breaklen*60
    })

  }

  timedec(){

    if(this.state.clocklen>0)
    {
      if(this.state.clocklen<=60)
      {
        var ele=document.getElementById('time-left');
        var ele1=document.getElementById('timer-label');
        ele.classList.add("text-red-700");
        ele1.classList.add("text-red-700")
      }
      else{
        var ele=document.getElementById('time-left');
        var ele1=document.getElementById('timer-label');
        ele.classList.remove("text-red-700");
        ele1.classList.remove("text-red-700")

      }
      this.setState({
        clocklen:this.state.clocklen-1
      })
    }
    else if(this.state.breakflag===0){
      this.setState({
      currentdisp:"Break",
      })
      this.audioBeep.play();
      this.startbreak()
    }
    else{
      this.audioBeep.play();
      this.setState({
        breakflag:0,
        currentdisp:"Session",
        clocklen:this.state.sessionlen*60
      })
    }
  }

  handlePlayBut(){
    if(this.state.timeflag===1)
    {
      this.clearintvar=setInterval(this.timedec,1000);
      this.setState({
        timeflag:0
      });
    }
    else{
      clearInterval(this.clearintvar);
      this.setState({
        timeflag:1
      });
    }
  }

  handleRefresh(){
    this.setState({
      clocklen:25*60,
      breaklen:5,
      sessionlen:25,
      currentdisp:"Session"
    });

  }


  handleBreakDec(){
    if(this.state.timeflag===1)
    {
      if(this.state.breaklen>1)
      {
        this.setState({
          breaklen:this.state.breaklen-1
        });

        if(this.state.breakflag===1)
        {
            this.setState({
              clocklen:(this.state.breaklen-1)*60
            });
        }  
      }
  


    }

  }

  handleBreakInc(){
    if(this.state.timeflag===1)
    {
      if(this.state.breaklen<60)
      {
        this.setState({
          breaklen:this.state.breaklen+1
        });

        if(this.state.breakflag===1)
        {
            this.setState({
              clocklen:(this.state.breaklen+1)*60
            });
        }
  
      }
  

    }

  }

  handleSessionDec(){
    if(this.state.timeflag===1)
    {
      if(this.state.sessionlen>1)
      {
        this.setState({
          sessionlen:this.state.sessionlen-1,
        });

        if(this.state.breakflag===0)
        {
          this.setState({
            clocklen:(this.state.sessionlen-1)*60
          });
  
        }
    
      }


    }

  }

  handleSessionInc(){
    if(this.state.timeflag===1)
    {
      if(this.state.sessionlen<60)
      {
        this.setState({
          sessionlen:this.state.sessionlen+1,
        });
        if(this.state.breakflag===0)
        {
          this.setState({
            clocklen:(this.state.sessionlen+1)*60
          });
        }

  
      }


    }

  }

  convertToMinutes(value){
    let a=Math.floor(value/60);
    let b=value%60;
    b=b<10?('0'+b):b;
    a=a<10?('0'+a):a;
    return `${a}:${b}`;

  }


  render(){
    const breakProps={
      title:'Break Length',
      count:this.state.breaklen,
      labelid:"break-label",
      decid:"break-decrement",
      incid:"break-increment",
      idlength:"break-length",
      handleDec:this.handleBreakDec,
      handleInc:this.handleBreakInc
    }

    const sessionProps={
      title:'Session Length',
      count:this.state.sessionlen,
      labelid:"session-label",
      decid:"session-decrement",
      incid:"session-increment",
      idlength:"session-length",
      handleDec:this.handleSessionDec,
      handleInc:this.handleSessionInc
    }

    return (
    <div>
      <div className='flex flex-col '>
        <div className='flex flex-col h-64 bg-slate-300'>
          <h1  className='font-semibold mx-auto my-4 text-3xl hover:text-blue-700 underline  underline-offset-4'>25+5 CLOCK</h1>
          <div className='flex flex-row my-9 w-auto'>
          <TimerContainer {...breakProps}/>
          <TimerContainer {...sessionProps}/>
          </div>
        </div>
        <div className='w-60 border-4  border-indigo-500/50 rounded-3xl mx-auto my-4 h-40'>
          <h2 id='timer-label' className='py-3 px-7 text-center text-xl font-bold '>{this.state.currentdisp}</h2>
          <p id='time-left' className='text-5xl mx-11 p-4'>{this.convertToMinutes(this.state.clocklen)}</p>
        </div>
        <div className='flex justify-evenly'>
          <button onClick={this.handlePlayBut} id="start_stop" className='p-2 bg-slate-500 hover:bg-slate-200 active:bg-blue-500'>
          <i className="fa-solid fa-play" ></i>
          <i className="fa-solid fa-pause"></i>
          </button>
          <button id='reset' className='p-2 bg-slate-500 hover:bg-slate-200 active:bg-blue-500' onClick={this.handleRefresh}>
          <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
      </div>
      <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
    );
  }
}

export default App;