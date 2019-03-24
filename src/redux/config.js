import Immutable from 'immutable';

export const version = {
  default: Immutable.fromJS({
    test: 1,
  }),
  persist: true,
  actions: {
    SET_VERSION: {
      reducer: (state, { payload }) => state.merge(payload),
    },
  },
};

export const dishes = {
  default: Immutable.fromJS({}),
  persist: true,
  actions: {
    UPDATE_DISHES_WITH_ID: {
      inputs: ['id', 'list'],
      reducer: (state, { payload }) =>
        state.mergeIn([payload.id], {
          list: payload.list,
          updatedAt: Date.now(),
        }),
    },
    CLEAR_DISHES: {
      reducer: () => Immutable.fromJS({}),
    },
  },
};

export const search = {
  default: Immutable.fromJS({
    recent: [],
    hot: [],
  }),
  persist: true,
  actions: {
    ADD_RECENT_SEARCK_KEY: {
      reducer: (state, { payload }) => {
        // TODO: 每次最新点击的数据,挪到最前面
        const index = state
          .get('recent')
          .findKey(a => a.get('key') === payload.key);
        if (typeof index !== 'undefined') {
          const list = state
            .get('recent')
            .filter((a, ind) => a.get('key') !== payload.key && ind < 9);
          return state.set('recent', list.unshift(Immutable.fromJS(payload)));
        }
        const list = state.get('recent').filter((a, ind) => ind < 9);
        return state.set('recent', list.unshift(Immutable.fromJS(payload)));
      },
    },
    CLEAR_DISHES: {
      reducer: () => Immutable.fromJS({}),
    },
  },
};

export const cook = {
  default: Immutable.fromJS({}),
  persist: true,
  actions: {
    UPDATE_COOK: {
      reducer: (state, { payload }) =>
        state.merge({
          list: Immutable.fromJS(payload),
          updatedAt: Date.now(),
        }),
    },
    CLEAR_COOK: {
      reducer: () => Immutable.fromJS({}),
    },
  },
};

export const collections = {
  default: Immutable.fromJS([]),
  persist: true,
  actions: {
    CHANGE_COLLECTIONS_STATE: {
      reducer: (state, { payload }) => {
        const index = state.find(a => a.get('id') === payload.id);
        if (typeof index === 'undefined') {
          return state.push(Immutable.fromJS(payload));
        }
        return state.filter(a => a.get('id') !== payload.id);
      },
    },
    CLEAR_COLLECTON: {
      reducer: () => Immutable.fromJS([]),
    },
  },
};
