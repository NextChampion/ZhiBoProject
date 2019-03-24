import UI from '../UI';

export default {
  headerMode: 'none',
  navigationOptions: {
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: UI.color.white1,
      borderBottomWidth: 0,
      shadowRadius: 0,
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      elevation: 0,
    },
    headerTitleStyle: {
      fontWeight: '600',
    },
    headerBackTitleStyle: {
      fontWeight: '400',
    },
    headerTintColor: UI.color.black,
  },
};
