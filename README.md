Daily Fetal Movement Tracker (DFM)

A React Native (Expo) mobile application that helps pregnant users track daily fetal movements by measuring the time taken to feel 10 fetal kicks.
This app works completely offline, stores data locally, and focuses on calm, user-friendly health UX.

This project was developed as part of the React Native Developer Internship Assignment – ONI Care.

Features

Kick Counter Timer

Manual START → STOP control

Timer starts only when the user is ready


Daily Session Tracking

Records time taken to feel 10 kicks

Sessions saved locally on device


Persistent Local Storage

Uses AsyncStorage

Data remains even after app restart

Past Records View

Displays all previous sessions

Sorted by latest first


ℹ️ Information Modal

Explains how to track fetal movements

Help Section

Guidance when fewer movements are felt

Offline-First

No backend or internet required


Clean UI

Inspired by provided Figma design

Optimized for calm, medical-style UX

🛠 Tech Stack

React Native

Expo (Managed Workflow)

React Navigation

AsyncStorage

JavaScript (ES6)

Project Structure
dfm-tracker-clean/
│
├── assets/
│   └── fetal_movement.png
│
├── src/
│   ├── components/
│   │   └── InfoModal.js
│   │
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   └── CounterScreen.js
│   │
│   ├── storage/
│   │   └── sessionStorage.js
│   │
│   └── utils/
│       └── timeUtils.js
│
├── App.js
├── app.json
├── package.json
├── README.md
└── .gitignore

▶️ How to Run the Project Locally
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/dfm-tracker.git
cd dfm-tracker

2️⃣ Install Dependencies
npm install

3️⃣ Start the App
npm start


Press a to open Android Emulator

OR scan QR code using Expo Go app


APK Build (Android)

The APK was generated using Expo EAS Build.

Build Command Used
eas build -p android --profile preview


Build type: APK

Workflow: Managed

Keystore: Expo Managed

The generated APK is included separately in the submission or shared via download link.

Data Storage Design

All tracking sessions are stored locally using AsyncStorage.

Data Structure
{
  id: string,
  date: string,
  duration: string,
  createdAt: number
}


Stored under a single storage key

Sessions are prepended so latest appears first

Serialized and parsed safely


App Flow (Execution)

User opens the app → Home Screen

Taps Record fetal movement

Counter screen opens

User taps START when ready

Timer runs until user taps STOP

User taps Save

Session is saved locally

User returns to Home Screen

Saved record appears under Past records


🧩 Design & UX Decisions

Start button added intentionally
Although the Figma reference shows an active timer, a manual START button was added to:

Give users control

Reduce anxiety

Improve usability in a health-sensitive context

Offline-first design

No backend was required per assignment instructions

Ensures reliability and privacy

Visual hierarchy

Larger timer area

Prominent actions

Reduced empty space

Balanced top-to-bottom layout


Screen Recording

A short screen recording (30–60 seconds) demonstrates:

App launch

Home screen

Recording a session

Saving data

Viewing past records

Info and Help modals


Tested On

Android Emulator

Expo Go (Android)

Android APK build (EAS)


Future Improvements

iOS build

Graphs for daily trends

Doctor sharing/export feature

Push reminders

Accessibility enhancements


Author

Behara Lakshmi Sai Charan
React Native Developer Intern Candidate


Assignment Notes

Figma was used as a design reference

Pixel-perfect replication was not the goal

Focus was on:

Functionality

Data persistence

UX reasoning

Code clarity


License

This project is created for educational and evaluation purposes only.
