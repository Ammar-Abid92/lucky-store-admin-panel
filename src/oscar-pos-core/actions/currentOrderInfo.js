import {ORDER} from '../../oscar-pos-core/actions/types';


export function saveCurrentOrderInfo(data){
    return{
        type: ORDER.SAVE_CURRENT_ORDER_INFO,
        data
    }
}


export function clearCurrentOrderInfo(){
    return{
        type: ORDER.CLEAR_CURRENT_ORDER_INFO
    }
}