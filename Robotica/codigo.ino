// Pinos do Sensor Ultrassônico
#define triggerPin 3
#define echoPin 4

// Pinos do Driver de Motor L298N/L293D (conforme imagens)

#define IN1 6
#define IN2 9  
#define IN3 10
#define IN4 11


// Função para medir a distância via ultrassom
long readUltrasonicDistance(int trigger, int echo) {
    digitalWrite(trigger, LOW);
    delayMicroseconds(2);
    
    digitalWrite(trigger, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigger, LOW);
    
    return pulseIn(echo, HIGH);
}

void ligarMotores(){
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
    digitalWrite(IN3, LOW);
    digitalWrite(IN4, HIGH);
};

void desligarMotores(){
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);
    digitalWrite(IN3, LOW);
    digitalWrite(IN4, LOW);
}

void setup() {
    // Configuração dos pinos do sensor
    pinMode(triggerPin, OUTPUT);
    pinMode(echoPin, INPUT);

    // Configuração dos pinos do motor
    pinMode(IN1, OUTPUT);
    pinMode(IN2, OUTPUT);
    pinMode(IN3, OUTPUT);
    pinMode(IN4, OUTPUT);

    // Estado inicial: motor desligado
    desligarMotores();

    Serial.begin(9600);
}

void loop() {
    // Cálculo da distância em centímetros
    float distancia = 0.01723 * readUltrasonicDistance(triggerPin, echoPin);

    // Condição: Ativa o motor se houver presença até 30 cm
    if (distancia < 30.0 && distancia > 0.0) {
        ligarMotores();
    } else {
        desligarMotores();
    }

    // Monitoramento via Serial
    Serial.print("Distância: ");
    Serial.print(distancia);
    Serial.println(" cm");

    delay(50); // Leve pausa para estabilizar a leitura
}