//This is the support file for the /views/index.ejs
$(function () {
  if (window.io == undefined) {
    console.warn && console.warn("! detected no socket found !");
    var mysocket = function () {
    };
    mysocket.prototype.emit = function (x) {
      console.log(x);
    };
    mysocket.prototype.emit = function (x, y) {
      console.log(x);
      console.log(y);
    };
    simevents = {};
    mysocket.prototype.on = function (x, y) {
      console.log('registering ' + x);
      if (simevents[x] == undefined) {
        simevents[x] = [];
      }
      simevents[x].push(y);
    };
    var io = new mysocket();
    var socket = new mysocket();
    CONFIG = {};
    CONFIG.sample_freq = 20;
  } else {
    var socket = window.io.connect(window.location.protocol + '//' +
                 window.location.hostname+ ':8080');
  }


  //plugin hooks
  var cockpit = new Cockpit(socket);
  cockpit.rov.on('cockpit.pluginsLoaded', function() {
  });
  window.cockpit = cockpit;

/*  window.addEventListener('WebComponentsReady', function(e) {
    //Manually wire up the event emitter to any element with
    //that attribute
    $('*[event-emitter]').each(function(){
      this.eventEmitter = window.cockpit;
    })
  });
*/
  $( document ).ready(function() {
    $('#t')[0]['cockpit-event-emitter'] = window.cockpit;
    $('#t')[0]['video_source'] = window.CONFIG.video_url;

    window.cockpit_int.i18n.loadNamespace('new-ui', function() {  });
    var key_s = window.cockpit_int.i18n.options.keyseparator;
    var ns_s =  window.cockpit_int.i18n.options.nsseparator;
    var prefix = 'new-ui';
    $('#t')[0]['__']=function(str){
      window.cockpit_int.i18n.options.ns.defaultNs = prefix
      return window.cockpit_int.__(str);
    };
  });
});