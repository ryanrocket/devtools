/*
 * eventque.js by Ryan Wans
 * Execute events, in que!
 * 
 * Defaults: Initiator: now (on eventQue.fire()),
 *           Delay: 500ms
 *           Verbose: false
 *           Auto Dump: flase
 *           Max Events: null
 * 
 * eventQue.init(initiator (string), delay (int), verbose (bool), autoDump (bool), maxEvents (int))
 * initiator values: 'now', 'onRender'
 * 
 * Push an event: eventQue.push(yourFunction())
 * Prioritize Event: eventQue.push(yourFunction(), spotNumber (int))
 * 
 * Pull an event: eventQue.pull(yourFunction())
 * 
 * Fire Que: eventQue.fire()
 * Fire Que After Delay: eventQue.fire(delay (int))
 * 
 * Get Output of Function: eventQue.out(yourFunction())
 * * Only Works After Firing Que * *
 * 
 * Stop Que: eventQue.stop()
 * 
 * Clear Que: eventQue.dump()
 * 
 * Delete Plugin: eventQue.destroy()
 * 
 * Properties:
 *    - eventQue.length  (returns length of que)
 *    - eventQue.time    (returns execution time of Que)
 *    - eventQue.fired   (returns if the que has fired)
 *    - eventQue.options (all others)
 * 
 */


var eventQue = {
  __eventque__: ["eventQue.__primeQue__()"],__currentEvent__: 0,__eventOutput__: [],length: null,time: 0,fired: false,__fireEvent__: null,
  options: {initiator: 'now',delay: 500,verbose: false,autoDump: false,maxEvents: null},
  init: (a,b,c,d,e) => {this.options.initiator = a,this.options.delay = b,this.options.verbose = c,this.options.autoDump = d,this.options.maxEvents = e;this.verbose('initalized eventQue!');return true;},
  push: (a,b) => {if(typeof a !== "string"){throw new Error("[que] invalid parameter : must be string of function name");}
    else {if(a.includes("()")){a.replace("()", "")}if(!b) {this.__eventque__.push(a);this.verbose('function '+a+' added to que');return true;} else {this.__eventque__.splice(b,0,a);this.verbose('function '+a+' added to que');return true;}}},
  __primeQue__: () => {},
  pull: (a) => {if(typeof a !== "string"){throw new Error("[que] invalid parameter : must be string of function name");}
    if(a.includes("()")){a.replace("()", "")}this.__eventque__ = this.__eventque__.filter(e => e !== a);this.verbose('event pulled from que');return true;},
  out: (a) => {try{this.verbose('grabbing return of function...');return __eventOutput__[__eventque__.indexOf(a)]}catch(e){throw new Error("[que] internal error : this function was not in que")}},
  stop: () => {try{clearInterval(__fireEvent__);this.verbose('destroyed the que event');return true;}catch(e){throw new Error("[que] internal error : process is not running")}},
  dump: () => {__eventque__ = ["eventQue.__primeQue__()"];this.verbose('que has been cleared');return true;},
  destory: () => {this.verbose('eventQue plugin destroyed');eventQue = undefined;return true},
  verbose: (a) => {if(options.verbose){console['info']('[que] verbose -> '+a)}},
  fire: (a) => {
    try {
      a = a || 0;
      var i =0;
      this.fired = true;
      this.verbose("firing the que!")
      __fireEvent__ = setTimeout(function() {
        var time0 = performance.now();
        for(i=0; i<__eventque__.length; i++) {
          var out = window[this.__eventque__[i]]();
          this.__eventOutput__.push(out);
          this.__currentEvent__++;
          setTimeout(function(){}, this.options.delay);
        }
        var finalTime = (performance.now() - time0);
        this.time = finalTime;
        this.verbose('que completed in '+finalTime+'ms');
      },a); 
    }catch(e){
      throw new Error("[que] internal error : could not fire event que");
    }
  },
};

~(function() {
  window.eventQue = window.eventQue || eventQue;
}());
