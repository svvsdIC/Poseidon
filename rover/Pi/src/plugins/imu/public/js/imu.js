(function(window) 
{
    'use strict';
    class IMU 
    {
        constructor( cockpit )
        {
            console.log('IMU Plugin running');

            var self = this;
            self.cockpit = cockpit;

            this.actions =
            {
                'plugin.imu.zeroYaw':
                {
                    description: 'Zero yaw/heading when in gyro mode',
                    controls:
                    {
                        button:
                        {
                            down: function()
                            {
                                self.zeroYaw();
                            }                            
                        }
                    }
                }
            };

            // Setup input handlers
            this.inputDefaults = 
            {
                keyboard: 
                {
                    "alt+y": { type: "button", action: 'plugin.imu.zeroYaw' }
                }
            };
        };

        zeroRollPitch()
        {
            this.cockpit.rov.emit( "plugin.imu.zeroRollPitch" );
        }

        clearRollPitchOffsets()
        {
            this.cockpit.rov.emit( "plugin.imu.clearRollPitchOffsets" );
        }

        zeroYaw()
        {
            this.cockpit.rov.emit( "plugin.imu.zeroYaw" );
        }

        getTelemetryDefinitions()
        {
            return [];
        };

        listen() 
        {
            var self = this;

            // zeroRollPitch
            this.cockpit.on('plugin.imu.zeroRollPitch', function()
            {
                self.zeroRollPitch();
            });

            this.cockpit.on('plugin.imu.clearRollPitchOffsets', function()
            {
                self.clearRollPitchOffsets();
            });

            // zeroYaw
            this.cockpit.on('plugin.imu.zeroYaw', function()
            {
                self.zeroYaw();
            });
        };
    };

    var plugins = namespace('plugins');
    plugins.IMU = IMU;
    window.Cockpit.plugins.push( plugins.IMU );

}(window));