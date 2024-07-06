1.Add dependencies, required files
-Open terminal and type : npm install,add android and ios folders
-android/app/build.gradle not android/build.gradle,add : apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle") to the end of the file.
-If you're using gradle 8.6 -> go to android/gradle/gradle-wrapper.properties,change distributionUrl from 8.6 to 8.5
-Add 
2.Run on android/ios
-Open another terminal and type:npm start,run on android->a,run on ios i
