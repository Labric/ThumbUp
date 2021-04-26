// import { Platform, Alert } from "react-native";
// import { launchCamera } from "react-native-image-picker";
// import { request, PERMISSIONS, RESULTS } from "react-native-permissions"


// export const requestPhotoLibraryPermission = async () => {
//   const photoResponse = await request(ReadPhotoPermission);
//   return photoResponse !== RESULTS.BLOCKED && photoResponse !== RESULTS.DENIED;
// };
// export const requestCameraPermission = async () => {
//   const cameraResponse = await request(CameraPermission);
//   return (
//     cameraResponse !== RESULTS.BLOCKED && cameraResponse !== RESULTS.DENIED
//   );
// };

// export async function launchImageLibraryPicker(options, imagePickerCallback) {
//   let granted = await requestPhotoLibraryPermission();
//   if (!granted) {
//     Alert.alert(
//         "nop",
//         "Missing the library's permissions",
//         [
//           {
//             text: "Cancel",
//             onPress: () => console.log("Cancel Pressed"),
//             style: "cancel"
//           },
//           { text: "OK", onPress: () => console.log("OK Pressed") }
//         ])
//   }
//   launchImageLibrary(options, imagePickerCallback);
// }

// export async function launchPhoneCamera(options, imagePickerCallback) {
//   let granted = await requestCameraPermission();
//   if (!granted) {
//     Alert.alert(
//         "nop",
//         "Missing the camera's permissions",
//         [
//           {
//             text: "Cancel",
//             onPress: () => console.log("Cancel Pressed"),
//             style: "cancel"
//           },
//           { text: "OK", onPress: () => console.log("OK Pressed") }
//         ])
//   }
//   launchCamera(options, imagePickerCallback);
// }



// const CameraPermission =
//   Platform.OS === "android"
//     ? PERMISSIONS.ANDROID.CAMERA
//     : PERMISSIONS.IOS.CAMERA;

// const ReadPhotoPermission =
//   Platform.OS === "android"
//     ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//     : PERMISSIONS.IOS.PHOTO_LIBRARY;
