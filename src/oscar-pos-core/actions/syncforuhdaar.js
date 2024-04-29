import AsyncStorage from '@react-native-community/async-storage'
export const sync = async (dispatch) => {
    return new Promise(async (resolve, reject) => {

    let customers = await  AsyncStorage.getItem('customer') || [];
    let deletedCustomers = await AsyncStorage.getItem("deletedCustomers") || [];
    let updatedCustomers = await AsyncStorage.getItem("updatedCustomers") || [];
    let payments = await AsyncStorage.getItem("payments") || [];
    
        // sync 
        // customers
        // deletedCustomers
        // updatedCustomers
        // payments

        // sync and empty the Asyncstorage


    })
}

