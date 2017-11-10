(function(window)
{
    console.log(`B0be window =  ${Object.keys(window)}`);
    'use strict';
    class Button
    {
        constructor( cockpit )
        {
            console.log('Button Plugin running');
            console.log('B0be: Button Plugin running');
	    console.log(`B0be clientButton cockpit.rov.withHistory = ${Object.keys(cockpit.rov.withHistory)}`);
            var self = this;
            self.cockpit = cockpit;

            self.settings = null;

            //Set up actions associated with this plugin
            this.actions =
            {};

            // Setup input handlers
            this.inputDefaults =
            {
                keyboard:
                {}
            };
        };
        getTelemetryDefinitions()
        {
            return [{
                name: 'button.value',
                description: 'The message sent from the example module in the MCU'
            }]
        };

        // This pattern will hook events in the cockpit and pull them all back
        // so that the reference to this instance is available for further processing
        listen()
        {
            var self = this;

            // Listen for response messages from the Node plugin
            this.cockpit.rov.withHistory.on('plugin.button.value', function( message )
            {
                //console.log( "New count is : " + message );
                self.cockpit.emit('plugin.button.value', message);
            });
        };
    };

    // Add plugin to the window object and add it to the plugins list
    var plugins = namespace('plugins');
    plugins.Button = Button;
    window.Cockpit.plugins.push( plugins.Button );

}(window));