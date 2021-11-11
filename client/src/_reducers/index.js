import { combineRecuers } from 'redux'
// combineRecuers: 여러개의 reducer가 있을때 (state가 여러개이기 때문에) 이걸 combineRecuers가 하나로 합쳐서 RootReducer로 보내 줌
// import user from './user_reducer';

const rootReducer = combineRecuers({
    //user

})

export default rootReducer;