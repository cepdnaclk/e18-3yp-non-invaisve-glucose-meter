#include <LiquidCrystal.h>
#include <util/delay.h>

LiquidCrystal lcd(2, 3, 4, 5, 6, 7);

int touch = 9; // pin for touch sensor
int low = 8;
int medium = 10;
int high = 11;


void setup()
{
  lcd.begin(16, 2); /* Initialize 16x2 LCD */
  pinMode(touch, INPUT);
  pinMode(low,OUTPUT);
  pinMode(medium,OUTPUT);
  pinMode(high,OUTPUT);
  lcd.clear(); /* Clear the LCD */
  Serial.begin(9600);
}

void loop()
{

  // check the state of the touch sensor
  int touchValue = digitalRead(touch);
  lcd.setCursor(0, 0);

  // if touched, print the value on LCD
  if (touchValue == HIGH)
  {
    double sum = 0;
    double realValue = 0;
    double voltageValue = 0;

    int i;
    for (i = 0; (i < 800) && (digitalRead(touch) == HIGH); i++)
    {
      // read the value from A0
      sum += analogRead(A0);
      lcd.setCursor(0, 0);
      
      lcd.print("Pending...!");
    }
    lcd.clear();
    Serial.println(i);
    if (i != 0){
      voltageValue = sum/i ;
      realValue = -2.533*pow(10,-5)*pow(voltageValue,4)+ 0.005822*pow(voltageValue,3) - 0.4625*pow(voltageValue,2) + 15.7*voltageValue -93.78 ;
      // lcd.print(sum / i);
      lcd.print("Glucose : ");
      lcd.print(realValue);
        lcd.setCursor(0, 1);
      if(realValue<70){
          digitalWrite(low,HIGH);
            lcd.print("Low");
      }
      else if(realValue>= 70 && realValue<160){
          digitalWrite(medium,HIGH);
            lcd.print("Normal");
      }
      else if(realValue>=160){
          digitalWrite(high,HIGH);
            lcd.print("High");
      }
      
    }
    // Serial.println("Readings taken. Remove your finger");
    while(digitalRead(touch) == HIGH)
    {
      Serial.println("HIGH");

    }
    Serial.println(realValue);
    Serial.println(i);
  }
  else
  {
    lcd.clear();
    lcd.print("keep the finger");
  }

  delay(2000);
  lcd.clear(); /* Clear the LCD */
}
