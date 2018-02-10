// General Assembly, WDI (Web Development Immersive) Remote, Cohort 02 (R2D2)
// Copyright (C) 2016 Matt Brendzel under the GNU General Public License.
// See LICENSE for details.

/// Data & Core Business Logic ///
const Stopwatch = {
  tickClock: function(){
    if (Stopwatch.isRunning) {
      setTimeout(Stopwatch.tickClock, 10); // trigger next clock tick
      Stopwatch.advanceTenMillisecs();
      AppController.handleClockTick();
    }
  },
  isRunning: false,
  mins: 0,
  secs: 0,
  millisecs: 0,
  laps: [],
  // DO NOT EDIT ABOVE THIS LINE
  advanceTenMillisecs: function(){
    if(this.millisecs === 1000){
      this.millisecs -= 1000;
      this.secs ++
    }
    if(this.secs >= 60){
      this.secs -= 60;
      this.mins ++
    }
    this.millisecs += 10;
    
    // Your Code Here
  },
  reset: function(){
    this.mins = 0;
    this.secs = 0;
    this.millisecs = 0;
    this.laps = [];
    // should be as simple as this no else statement required.
  },
  start: function(){
    if(this.isRunning === false){
      this.isRunning = true;
      this.tickClock();
    }
    // should be as simple as this no else statement required.
  },
  stop: function(){
    if(this.isRunning === true){
      this.isRunning = false;
    }
    // should be as simple as this no else statement required.
  },
  lap: function(){
    if(this.isRunning === true){
      this.laps.push({
        mins: this.mins,
        secs: this.secs,
        millisecs: this.millisecs
      })
      //append -->let newLap = `<span>Stopwatch.mins</span>:<span>Stopwatch.secs</span>:<span>Stopwatch.millisecs</span>`
    }
  }
};

/// User Interface ///
const ViewEngine = {
  updateTimeDisplay: function(mins, secs, millisecs){

    
    $('#mins').text(ViewHelpers.zeroFill(mins, 2));
    $('#secs').text(ViewHelpers.zeroFill(secs, 2));
    $('#millisecs').text(ViewHelpers.zeroFill((millisecs/10), 2));
    
    
    // Your Code Here
  },
  updateLapListDisplay: function(){
   let lapsList = $('#lap-list')
   let stopLap = Stopwatch.laps
   lapsList.html('')
   for(i = 0; i < Stopwatch.laps.length; i ++){
    
    lapsList.append(`
      <li>${ViewHelpers.zeroFill(stopLap[i].mins, 2)}\: ${ViewHelpers.zeroFill(stopLap[i].secs, 2)}\: ${ViewHelpers.zeroFill(stopLap[i].millisecs/10, 2)}</li>
    `)
   }
    
    
    //ADDS recorded laps in <ol #lap-list> set in <li> mins secs millisecs</li> 'ZERO PADDED'
    // Your Code Here
  },
};
const ViewHelpers = {
  zeroFill: function(number, length){
    let numString = number.toString();
    for(let i = numString.length; i < length; i ++){
      numString = '0' + numString;
    }
    return numString
    }
    
    /*
      var new_num = num.toString();
    for (var i = new_num.length; i < min_size; i++) {
        new_num = '0' + new_num;
    }
    return new_num;


    */
         
    
    
  
};










/// Top-Level Application Code ///
const AppController = {
  handleClockTick: function(){
    let mins = Stopwatch.mins;
    let secs = Stopwatch.secs;
    let millisecs = Stopwatch.millisecs;

    ViewEngine.updateTimeDisplay(mins, secs, millisecs);
    //GET time mins, secs, millisecs from 'StopWatch'
    // Your Code Here
  },
  handleClickStart: function() {
    if(Stopwatch.isRunning === false){
      Stopwatch.start();
    } 
  },
  handleClickStopReset: function(){
    if(Stopwatch.isRunning === true){
      Stopwatch.stop();
    // STOPS stopwatch
    } else {
      Stopwatch.reset();
      AppController.handleClockTick()
      ViewEngine.updateLapListDisplay(Stopwatch.laps)
      
      //RESETS stopwatch
      //sets mins,sec,millisecs to 0
      //updates lap list to EMPTY
    }
  },
  handleClickLap: function(){
    if(Stopwatch.isRunning === true){ 
      Stopwatch.lap();
      ViewEngine.updateLapListDisplay(Stopwatch.laps)
    // records lap;
    //updates lap display;
    }
  }
};

window.onload = function(){
  // Attach AppController methods to the DOM as event handlers here.
  $('#start').on('click', AppController.handleClickStart);
  $('#lap').on('click', AppController.handleClickLap);
  $('#stop').on('click', AppController.handleClickStopReset);
};
