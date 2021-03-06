#pragma once

// Includes
#include <orutil.h>
#include "CModule.h"

class CReceiver : public CModule
{
    public:
        CReceiver();
        void Initialize();
        void Update( CCommand& commandIn );
    private:
        // other interesting variable
        float value[NUM_INPINS];
        int minInMicros[NUM_INPINS], maxInMicros[NUM_INPINS];//boundary variables for each channel      
        int inPins[NUM_INPINS] = {4, 5, 2, 3}; //LY receiver chan 4, LX receiver chan 3, RY receiver chan 2, RX receiver chan 1 
        
        // Input
        inputset controlValues; // the percentage values that are sent to the pi
        
        // timer variables are used by the interrupt handler for reading PWM
        volatile unsigned long timerStart[NUM_INPINS];
        volatile unsigned long timeValue[NUM_INPINS];
};
