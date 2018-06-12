#create bundle
#echo Bundling javascript resources
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

cd android

#echo Copying v4 folders to non-v4 resources
cp -r app/src/main/res/drawable-hdpi-v4/ app/src/main/res/drawable-hdpi/
cp -r app/src/main/res/drawable-mdpi-v4/ app/src/main/res/drawable-mdpi/
cp -r app/src/main/res/drawable-xhdpi-v4/ app/src/main/res/drawable-xhdpi/
cp -r app/src/main/res/drawable-xxhdpi-v4/ app/src/main/res/drawable-xxhdpi/
cp -r app/src/main/res/drawable-xxxhdpi-v4/ app/src/main/res/drawable-xxxhdpi/

@echo removing V4 resource contents
rm -rf app/src/main/res/drawable-hdpi-v4/*
rm -rf app/src/main/res/drawable-mdpi-v4/*
rm -rf app/src/main/res/drawable-xhdpi-v4/*
rm -rf app/src/main/res/drawable-xxhdpi-v4/*
rm -rf app/src/main/res/drawable-xxxhdpi-v4/*

#build the release apk
echo building release apk

./gradlew assembleRelease


echo signing the apk (will need to enter sign passcode)
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/fredoleary/android_key_store/jibu_pos app/build/outputs/apk/release/app-release-unsigned.apk key_jubu -signedjar sema.apk
