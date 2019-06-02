import { getDatabase } from './common';
import { VIDEOS} from './collectionNames';

const db = getDatabase();
const collection = db.collection(VIDEOS);

export const getNewest = ({ success}) => {
  collection
    .limit(1)
    .get()
    .then(res => {
      success && success(res);
    })
    .catch()
}
