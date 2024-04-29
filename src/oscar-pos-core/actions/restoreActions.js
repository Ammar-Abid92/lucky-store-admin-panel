import AsyncStorage from "@react-native-community/async-storage";
import {
    openDb,
    getActivationCode,
    uploadReceipt,
  } from "../actions";


export const restoringData = async () => {
    return dispatch => {
        let values = await AsyncStorage.multiGet([
            "phone_number",
            "activation_code",
            "session_id",
          ]);
          let phone_number = values[0][1];
          let activation_code = values[1][1];
          let session_id = values[2][1];

          if (true) {
            let realm = await openDb();
            let user = await UserDB.getUserFromDb(realm, session_id);
            activation_code = user.activation_code;
            phone_number = user.phone_number;
            let payload = {
              username: phone_number,
              code: "VK!UdWjgtMwjFPgal4t^TeeWXPb1&h0AlebIROpQLQt5S4YI",
            };
            let activationCodeRes = await getActivationCode(payload, BASE_URL);
            activation_code = activationCodeRes.data.activation_code;
            let userUpdated = await UserDB.updateUserActivationCode(realm, {
              activation_code,
              id: session_id,
            });
            console.log("userUpdated :", userUpdated);
            store.dispatch({ type: USER.GET_USER, data: { ...userUpdated } });
            console.log(
              "getActivationCode activation_code: ",
              activationCodeRes.data
            );
            AsyncStorage.setItem("phone_number", phone_number);
            AsyncStorage.setItem("activation_code", activation_code);
          }
    }
}