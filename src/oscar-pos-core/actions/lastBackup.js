// import UserDB from "../../db/user";
import LastBackupDB from "../../db/lastBackup";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export const getlastBackup = (realm) => {
  return new Promise((resolve, reject) => {
    LastBackupDB.getLastBackup(realm)
      .then((res) => {
        console.log("getLastBackup action : ", res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const setlastBackup = (realm) => {
  return new Promise((resolve, reject) => {
    LastBackupDB.setLastBackup(realm)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
