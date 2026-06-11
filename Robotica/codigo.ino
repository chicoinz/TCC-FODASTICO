#define motorPin 9
#define triggerPin 7
#define echoPin 4




long readUltrasonicDistance(int trigger, int echo)
{
  pinMode(trigger, OUTPUT);  // Clear the trigger
  digitalWrite(trigger, LOW);
  delayMicroseconds(2);
  // Sets the trigger pin to HIGH state for 10 microseconds
  digitalWrite(trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigger, LOW);
  pinMode(echo, INPUT);
  // Reads the echo pin, and returns the sound wave travel time in microseconds
  return pulseIn(echo, HIGH);
}

void setup(){
 pinMode(triggerPin, INPUT);
 pinMode(echoPin, INPUT);
 pinMode(motorPin, OUTPUT);
};



void loop()
{
   /*
    0.01723 = constante para transformar o valor de milimetros para cm;
    
    
    se a distância for menor que  cm, ele liga o motor*/
  if(0.01723*readUltrasonicDistance(triggerPin, echoPin) < 30){
    digitalWrite(motorPin, HIGH);
  } //se não, deixa desligado.
  else {
    digitalWrite(motorPin, LOW);
  }
}
