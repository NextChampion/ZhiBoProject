import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import UI from '../UI';

export default function PullViewContainer({
  children,
  onPress,
  title,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={UI.font.title}>{title}</Text>
        <TouchableOpacity onPress={onPress} style={styles.pullViewTouchView}>
          <Image
            source={require('../images/pull_view_close.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}

PullViewContainer.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.object,
};

PullViewContainer.defaultProps = {
  children: null,
  onPress: null,
  title: null,
  style: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: UI.color.bg1,
    minWidth: 300,
    height: 480 + (UI.IS_IPHONE_X ? 44 : 0),
    paddingBottom: UI.IS_IPHONE_X ? 24 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: UI.unit * 4,
    paddingTop: 12,
  },
  pullViewTouchView: {
    paddingTop: 12,
    paddingRight: UI.unit * 4,
  },
});
