import { useImmerReducer } from 'use-immer';

const initialState = {
  expandedType: 'hiragana',
  hiraganaCategories: ['base'],  // Separate state
  katakanaCategories: []         // Separate state
};

function accordionReducer(draft, action) {
  switch (action.type) {
    case 'TOGGLE_TYPE':
      draft.expandedType = draft.expandedType === action.payload ? null : action.payload;
      break;
    
    case 'TOGGLE_HIRAGANA_CATEGORY':
      const hIndex = draft.hiraganaCategories.indexOf(action.payload);
      if (hIndex > -1) {
        draft.hiraganaCategories.splice(hIndex, 1);
      } else {
        draft.hiraganaCategories.push(action.payload);
      }
      break;
      
    case 'TOGGLE_KATAKANA_CATEGORY':
      const kIndex = draft.katakanaCategories.indexOf(action.payload);
      if (kIndex > -1) {
        draft.katakanaCategories.splice(kIndex, 1);
      } else {
        draft.katakanaCategories.push(action.payload);
      }
      break;
  }
}

export function useAccordionState() {
  const [state, dispatch] = useImmerReducer(accordionReducer, initialState);

  const toggleType = (type) => {
    dispatch({ type: 'TOGGLE_TYPE', payload: type });
  };

  const toggleCategory = (type, categoryId) => {
    if (type === 'hiragana') {
      dispatch({ type: 'TOGGLE_HIRAGANA_CATEGORY', payload: categoryId });
    } else {
      dispatch({ type: 'TOGGLE_KATAKANA_CATEGORY', payload: categoryId });
    }
  };

  const isCategoryExpanded = (type, categoryId) => {
    if (type === 'hiragana') {
      return state.hiraganaCategories.includes(categoryId);
    } else {
      return state.katakanaCategories.includes(categoryId);
    }
  };

  return {
    expandedType: state.expandedType,
    toggleType,
    toggleCategory,
    isCategoryExpanded
  };
}