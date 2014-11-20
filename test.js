// Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.
// Licensed under the MIT License. 
// See License.txt in the project root for license information.

var galileo = require("ms-iot-wiring"); // adds the ms-iot-wiring module

var led = 13;

// setup
//galileo.ioInit(); // needs to be done in order to initialize the board and pins
galileo.pinMode(led, galileo.OUTPUT); // sets pin 13 to output

// loop
while (1) {
   // Global Variables
   console.log('----- Global Variables -----');
   console.log("LOW: %d", galileo.LOW);
   console.log("HIGH: %d", galileo.HIGH);
   
   console.log("INPUT: %d", galileo.INPUT);
   console.log("OUTPUT: %d", galileo.OUTPUT);
   console.log("INPUT_PULLUP: %d", galileo.INPUT_PULLUP);
   
   console.log("CHANGE: %d", galileo.CHANGE);
   console.log("FALLING: %d", galileo.FALLING);
   console.log("RISING: %d", galileo.RISING);
   
   console.log("LSBFIRST: %d", galileo.LSBFIRST);
   console.log("MSBFIRST: %d", galileo.MSBFIRST);
   
   // console.log("WLED: %d", galileo.WLED);
   // console.log("LED_BUILTIN: %d", galileo.LED_BUILTIN);
   
   console.log("PI: %d", galileo.PI);
   console.log("HALF_PI: %d", galileo.HALF_PI);
   console.log("TWO_PI: %d", galileo.TWO_PI);

   // Digital Tests
   console.log('\n----- Digital Tests -----');
   console.log('Digital Write');
   galileo.digitalWrite(13, 0);
   console.log("LED OFF");
   console.log('Delay 1 seconds');
   galileo.delay(1000);
   galileo.digitalWrite(13, 1);
   console.log("LED ON");
   console.log('DelayMicroseconds for 1 second');
   galileo.delayMicroseconds(1000000);
   
   console.log('Digital Read');
   galileo.digitalRead(2);
   
   console.log('Millis: %d', galileo.millis());
   console.log('Micros: %d', galileo.micros());
   
   // shift in: datapin, clockpin, bitorder
   console.log('ShiftIn');
   galileo.shiftIn(1, 2, galileo.LSBFIRST);
   console.log('ShiftOut');
   galileo.shiftOut(1, 2, galileo.LSBFIRST, 10);
   
   // Analog Tests
   console.log('\n----- Analog Tests -----');
   console.log('AnalogWriteResolution');
   galileo.analogWriteResolution(12);
   console.log('AnalogReadResolution');
   galileo.analogReadResolution(12);
   console.log('AnalogWrite');
   galileo.analogWrite(3, 4095);
   
   console.log("Temperature: ");
   var temp = galileo.analogRead(1);
   console.log(temp);
   console.log("\n");
   
   console.log('Tone with 2 arguments on pin 10');
   galileo.tone(10, 300);
   console.log('1 second delay');
   galileo.delay(1000);
   console.log('NoTone on pin 10:');
   galileo.noTone(10);
   console.log('1 second delay');
   galileo.delay(1000);
   console.log('Tone with 3 arguments on pin 10 duration is 1 second');
   galileo.tone(10, 300, 1000);
   console.log('5 second delay');
   galileo.delay(5000);
   
   // SPI Tests
   console.log('\n----- SPI Tests -----');
   var spi = galileo.Spi();
   console.log('Checking whether SPI is defined: ' + spi);
   console.log('Calling Spi Begin');
   spi.begin();
   console.log('Calling Spi SetDataMode');
   spi.setDataMode(galileo.SPI_MODE1);
   console.log('Calling Spi SetClockDivider');
   spi.setClockDivider(galileo.SPI_CLOCK_DIV64);
   console.log('Calling Spi SetBitOrder');
   spi.setBitOrder(galileo.LSBFIRST);
   console.log('Calling Spi Transfer');
   spi.transfer(10);
   console.log('Calling Spi End');
   spi.end();
   
   // Wire/I2C Tests
   console.log('\n----- Wire/I2C Tests -----');
   var wire = galileo.Wire();
   console.log('Wire Begin');
   wire.begin();
   
   console.log('\nWire BeginTransmission');
   wire.beginTransmission(0x25); // transmit to device, device address is specified in datasheet
   
   console.log('Wire Write: 1 integer argument');
   console.log('Wrote: ' + wire.write(10) + ' bytes');
   console.log('Wire EndTransmission');
   console.log('Status of transmission: ' + wire.endTransmission()); 
   
   console.log('\nwire write: 1 string argument');
   console.log('wrote: ' + wire.write("hello") + ' bytes');
   console.log('wire endtransmission with true stop');
   console.log('status of transmission: ' + wire.endTransmission(true));

   console.log('Wire Write: 2 arguments');
   var array = [0x01, 0x02, 0x03, 0x04];
   console.log('wrote ' + wire.write(array, 4) + ' bytes');
   console.log('wire endtransmission with false stop');
   console.log('status of transmission: ' + wire.endTransmission(false));
   
   console.log('Return values:');
   console.log('0:success');
   console.log('1:data too long to fit in transmit buffer');
   console.log('2:received NACK on transmit of address');
   console.log('3:received NACK on transmit of data');
   console.log('4:other error\n');
   
   console.log('Wire RequestFrom with 2 paramaters: address and quantity');
   console.log('bytes ready: ' + wire.requestFrom(0x25, 1));
   console.log('Wire RequestFrom with 3 paramaters: address, quantity, and true stop');
   console.log('bytes ready: ' + wire.requestFrom(0x25, 1, true)); // stop is a boolean. true will send a stop message where false will restart the connection keeping it active
   console.log('wire requestfrom with 3 paramaters: address, quantity, and false stop');
   console.log('bytes ready: ' + wire.requestFrom(0x25, 1, false));
   
   console.log('Wire Available');
   console.log('Available bytes: ' + wire.available());
   console.log('Wire Read');
   console.log('Read: ' + wire.read());
   console.log('Wire OnReceive');
   wire.onReceive();
   console.log('\nWire OnRequest');
   wire.onRequest();
   
   console.log('\n----- End of Loop -----\n\n');
   galileo.delay(5000);
}
