# MeditationsApp

## Beskrivning

MeditationsApp är en mobilapp skapad med React Native och Expo. Den hjälper användare att slappna av genom att erbjuda olika funktioner såsom andningsövningar, avslappnande musik och möjligheten att skriva ner reflektioner. Användaren kan välja att utföra andningsövningar, lyssna på meditationsmusik eller skriva självreflektioner i anteckningar.

Appen använder React Navigation för att navigera mellan olika skärmar och erbjuder en responsiv, användarvänlig upplevelse.

## Funktioner

- **Andningsövning**: En animation som visar hur man ska andas in, hålla andan och andas ut, med haptisk feedback för varje cykel-fas.
- **Meditationsmusik**: En funktion för att spela lugnande musik med en animerad bakgrund.
- **Självreflektion**: Möjlighet att reflektera och skriva och spara anteckningar.

## Använda komponenter

### React Native-komponenter

1. **View** - För layout och positionering av olika element.
2. **Text** - För att visa text i appen, inklusive instruktioner och tips.
3. **Button** - För att starta och stoppa andningsövningen samt spela eller pausa musik.
4. **Animated.View** - För att skapa animationer, t.ex. för att ändra storleken på bollen i andningsövningen och animerade bakgrunder.

### Expo SDK-komponenter

1. **Haptics** - Används för att ge haptisk feedback under andningsövningen.
2. **Audio** - För att spela upp avslappnande musik.
3. **LinearGradient** - Används för att skapa en gradient bakgrund på meditationsmusiksidan.
4. **AsyncStorage** - För att spara och ladda användarens anteckningar lokalt på enheten.

## Installation och körning

### Krav

- Node.js
- Expo CLI
- En fysisk enhet eller emulator för att testa appen

### Steg för att köra projektet

1. Klona projektet från GitHub:

   git clone <Ditt-Repo-URL>

2. Gå till projektmappen:

   cd MeditationsApp

3. Installera nödvändiga paket:

   npm install

4. Starta Expo:

   npx expo start

5. Skanna QR-koden med din mobila enhet eller kör appen i en emulator.

## Uppfyllda krav

1. Minst 4 React Native-komponenter har använts (View, Text, Button, Animated.View).
2. Minst 4 Expo SDK-komponenter har använts (Haptics, Audio, LinearGradient, AsyncStorage).
3. React Navigation har implementerats för att skapa en bättre användarupplevelse.
4. Git och GitHub har använts för versionshantering.
5. README.md-filen innehåller beskrivning och krav för projektet.
6. Uppgiften lämnas in i tid.
7. Muntlig presentation är genomförd.
