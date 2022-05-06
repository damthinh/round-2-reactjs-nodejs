import { all } from 'redux-saga/effects';
import { itemSaga } from './ItemSaga';

export default function* rootSaga() {
  yield all([
    ...itemSaga
  ]);
}