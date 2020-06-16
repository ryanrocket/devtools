/*
 * eventque.js by Ryan Wans
 * Execute events, in que!
 */


const eventQue = {
  que: [],
  initiator: 'onrender',
  delay: 500,
  
  
};

~(function() {
  window.eventQue = window.eventQue || eventQue;
}());
