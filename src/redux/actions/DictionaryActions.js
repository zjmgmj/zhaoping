import {gettypelist} from '../../utils/mixins';

export const dictionaryActions = (actionType, data) => {
  return {type: actionType, data};
};

export function SetDictionary(key, actionType) {
  return dispatch => {
    gettypelist(
      key,
      res => {
        dispatch(dictionaryActions(actionType, res.data));
      },
      err => {
        console.log(err);
      },
    );
  };
}
