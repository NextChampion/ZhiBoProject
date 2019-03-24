import React from 'react';
import { TouchableOpacity, View, Keyboard, Image } from 'react-native';
import UI from '../UI';

export function HeaderLeft({
  navigation,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation) {
          Keyboard && Keyboard.dismiss();
          navigation.goBack();
        } else if (onPress) {
          Keyboard && Keyboard.dismiss();
          onPress();
        }
      }}
    >
      <View
        style={{
          height: 44,
          width: UI.IS_IPHONE_SE ? 56 : 64,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

      <Image
        source={require('../images/icBack.png')}
        style={{width: 20, height: 16, marginLeft: 5,}}
      />
      </View>
    </TouchableOpacity>
  );
}

export function HeaderRight({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 44,
          width: UI.IS_IPHONE_SE ? 180 : 200,
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          paddingRight: 20,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}
