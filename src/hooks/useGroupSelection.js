import { useImmerReducer } from 'use-immer';
import nekoData from '../data/nekoData';

const initialState = {
  selectedGroups: []
};

function groupSelectionReducer(draft, action) {
  switch (action.type) {
    case 'TOGGLE_GROUP':
      const groupId = action.payload;
      const index = draft.selectedGroups.indexOf(groupId);
      
      if (index > -1) {
        draft.selectedGroups.splice(index, 1);
      } else {
        draft.selectedGroups.push(groupId);
      }
      break;
      
    case 'CLEAR_SELECTION':
      draft.selectedGroups = [];
      break;
      
    case 'SELECT_ALL':
      draft.selectedGroups = action.payload;
      break;
  }
}

export function useGroupSelection() {
  const [state, dispatch] = useImmerReducer(groupSelectionReducer, initialState);

  const toggleGroup = (type, category, group) => {
    const groupId = `${type}-${category}-${group}`;
    dispatch({ type: 'TOGGLE_GROUP', payload: groupId });
  };

  const isGroupSelected = (type, category, group) => {
    const groupId = `${type}-${category}-${group}`;
    return state.selectedGroups.includes(groupId);
  };

  const getSelectedCharacters = () => {
    return nekoData.filter(k => 
      state.selectedGroups.some(id => {
        const [t, c, g] = id.split('-');
        return k.type === t && k.group === g;
      })
    );
  };

  const getTotalSelectedChars = () => {
    return getSelectedCharacters().length;
  };

  const clearSelection = () => {
    dispatch({ type: 'CLEAR_SELECTION' });
  };

  const selectAll = (groupIds) => {
    dispatch({ type: 'SELECT_ALL', payload: groupIds });
  };

  return {
    selectedGroups: state.selectedGroups,
    toggleGroup,
    isGroupSelected,
    getSelectedCharacters,
    getTotalSelectedChars,
    clearSelection,
    selectAll
  };
}