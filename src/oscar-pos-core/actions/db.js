import { CUSTOMER, DB } from "./types";
import OpenDB from '../../db/openDb'

export const openDb = () => {
    return new Promise((resolve, reject) => {
        OpenDB.openRealmDb().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })

}

export const makeDbCopy = () => {
    return new Promise((resolve, reject) => {
        OpenDB.makeDbCopy().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })

}