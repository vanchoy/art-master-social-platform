# Art Masters - Social Platform for artists
Social Media App for Artists. This is an Ionic project.
   
## 0.  About the project
 ### The Idea
ArtMaster is a social media application that allows users to share images with others. The application is structured around boards which are collections of images that users can create and share with others. ArtMaster also allows users to edit their accounts and their own posts to be able to share their stories with other users.

 ### The Design
 There are many design principles that can be followed when designing a mobile application. Some of these principles include keeping the user in mind, making the app easy to use, and making sure the app is visually appealing.

When designing a mobile application, it is important to keep the user in mind. The app should be designed in a way that is easy for the user to navigate and use. All of the features of the app should be easy to find and use.

Making sure the app is visually appealing is also important. The app should be designed in a way that is pleasing to the eye. The app should also be designed to be easy to use.


In mobile application design, usability is key to creating a successful app. Users should be able to easily navigate and use the app with minimal effort. The user interface (UI) should be intuitive and user-friendly, and the overall design should be clean and uncluttered.


There are a few key factors we kept in mind when designing ArtMaster App: 

1. Ease of use: The app should be easy to use, with a simple and intuitive UI. 

2. Functionality: The app should be designed to perform the tasks it is meant to, and do so in a way that is easy for users to understand. 

3. Aesthetics: The app should be visually appealing, with a clean and professional design. 

4. Usability testing: It is important to test the app with actual users to ensure that it is usable and meets their needs. 


By keeping these factors in mind, we could create a mobile app that is both usable and successful.

 ### Thinking in React
Thinking in React is a process that helps developers create user interfaces that are both effective and efficient. The process begins with thinking about the user and what they need from the interface. Once the user’s needs are understood, the developer can create a plan for the interface. This plan should consider the user’s workflow and how they will interact with the interface. When you build a user interface with React, you will first break it apart into pieces called components. Then, you will describe the different visual states for each of your components. Finally, you will connect your components together so that the data flows through them. In this tutorial, we’ll guide you through the thought process of building a searchable product data table with React.

 ### Project Structure
- The folder `src/assets` contains all the images used on the website.

- The folder `src/components` contains the components of the app.

- The folder `src/pages` contains all the pages on the app.

- The folder `src/theme` contains all the css files.

## Prerequisits (Important)
### **You must have these pre-installed:**
*Ionic<br />

## 1. Installation
A step by step installation process that tells you how to set up the project.

 ### 1.1. Project Setup
Install packages:
```
npm i
```
Sets up the project and installs all packages from `package.json`. Wait for the instalation of all packages to complete.

## 2. Run
How to run the project on the Web Browser, and nativily on iOS/Android.

 ### Run in a browser
 One of the following:

 ```
npm start
# or 
npx start
# or 
npx ionic serve 
 ```

 ### Android Devices
    Requirements:
- Java JDK 8
- Android Studio
- Updated Android SDK tools, platform and component dependencies. Available through Android Studio’s SDK Manager

    Running Your App:
To run your app, all you have to do is enable USB debugging and Developer Mode on your Android device, then `run ionic cordova run android --device` from the command line.
This will produce a debug build of your app, both in terms of Android and Ionic’s code
Enabling USB debugging and Developer Mode can vary between devices, but is easy to look up with a Google search. You can also check out Enabling On-device Developer Options in the Android docs.

    Production Builds:
    ```
    ionic cordova run android --prod --release
    # or
    ionic cordova build android --prod --release
    ```
 ### iOS Devices
    Requirements:
- Xcode 7 or higher
- iOS 9
- A free Apple ID or paid Apple Developer account

    Running Your App:
- Run a production build of your app with ionic cordova build ios --prod
- Open the .xcodeproj file in platforms/ios/ in Xcode
- Connect your phone via USB and select it as the run target
- Click the play button in Xcode to try to run your app