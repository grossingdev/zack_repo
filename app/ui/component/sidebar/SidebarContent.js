/**
 * Created by baebae on 4/5/16.
 */
import React, {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
  Component,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const window = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import constant from '../../styles/constant';

class SidebarContent extends Component {
  state = {
    avatarDataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    tribeDataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
  };

  logout() {
    this.props.dispatch(logout());
  }

  renderUserAvatar() {
    let {user} = this.props;
    if (user) {
      return (
        <View style={styles.imgContainer}>
          <Image source={{uri: user.profileImageURL}} style={styles.imageUser}/>
          <Text style={styles.labelUser}>{user.name.toUpperCase()}</Text>
        </View>
      )
    } else {
      return (
        <Text style={{ color: 'white', fontSize: 20}}>
          {this.props.title}
        </Text>
      );
    }
  }

  avatarSelected(avatar){
    let tribe = this.props.tribeList[0];
    this.props.dispatch(updateSelectedAvatar(avatar));
    this.props.dispatch(updateSelectedTribe(tribe));
    this.props.dispatch(updateShowSidebar(2));
    Actions.tribeListContainer();
  }

  tribeSelected(item) {
    this.props.dispatch(updateSelectedTribe(item));
    this.props.dispatch(updateShowSidebar(2));
  }

  renderAvatarRow(item) {
    return (
      <TouchableOpacity style={styles.avatarNameContainer} onPress={()=>this.avatarSelected(item)}>
        <Image source={{uri: item.profilePic}} style={styles.centerImageAvatar}/>
        <View style={{flex: 1,justifyContent: 'center', height: 40}}>
          <Text style={styles.avatarName}>{item.nickName}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderAvatarList() {
    let {avatarList} = this.props;
    if (avatarList && avatarList.length) {
      console.info('avatarList:' + avatarList);
      let avatarDataSource = this.state.avatarDataSource.cloneWithRows(avatarList);

      return (
        <ListView
          style={styles.listView}
          dataSource={avatarDataSource}
          renderRow={(item)=>this.renderAvatarRow(item)}
        />
      );
    }
  }

  renderTribeRow(item) {
    return (
      <TouchableOpacity style={styles.avatarNameContainer} onPress={()=>this.tribeSelected(item)}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.centerImageAvatar}/>
        <View style={{flex: 1,justifyContent: 'center', height: 40}}>
          <Text style={styles.avatarName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  renderTribeList() {
    let {tribeList} = this.props;
    if (tribeList && tribeList.length) {
      let tribeDataSource = this.state.tribeDataSource.cloneWithRows(tribeList);

      return (
        <ListView
          style={styles.listView}
          dataSource={tribeDataSource}
          renderRow={(item) => this.renderTribeRow(item)}
        />
      );
    }
  }
  renderAvatarContainer() {
    return (
      <ScrollView style={styles.avatarContainer}>
        <TouchableOpacity onPress={()=>this.logout()}>
          <Text style={styles.labelAvatar}>
           Item1
          </Text>
        </TouchableOpacity>
        {this.renderUserAvatar()}
        <View style={styles.sep}></View>
        <Text style={styles.labelAvatar}>
          Item2
        </Text>
        {this.renderAvatarList()}
        <View style={styles.sep}></View>
        <Text style={styles.labelAvatar}>
          Item3
        </Text>
        {this.renderTribeList()}
        <View style={{marginVertical: 20}}></View>
      </ScrollView>
    )
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        {this.renderAvatarContainer()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width * 2 / 3,
    height: window.height,
    paddingLeft: 10,
    paddingTop: 20,
    backgroundColor: '#2C3E50',
  },
  avatarContainer: {
    flex: 1
  },
  labelAvatar: {
    color: constant.colors.white,
    fontSize: 15
  },
  imgContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUser: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 2,
  },
  labelUser: {
    color: constant.colors.white,
    fontSize: 17,
    marginTop: 15
  },
  sep: {
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    height: 1,
    backgroundColor: constant.colors.white
  },
  listView:{
    flex:1
  },
  avatarNameContainer: {
    marginTop: 10,
    flexDirection:'row',
  },
  avatarName: {
    color: constant.colors.white,
    fontSize: 15,
  },
  centerImageAvatar: {
    width: 40,
    height: 40,
    borderRadius:20,
    borderWidth:2,
    borderColor:'#C94C26',
    marginBottom:5,
    marginLeft:5,
    marginRight: 10,
  },
});

import {connect} from '../../../../node_modules/react-redux/native';
export default connect()(SidebarContent);