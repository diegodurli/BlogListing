/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { vw, vh } from './ViewportUnits';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';

class BlogListing extends Component {

  constructor() {
    super();
  }

  _onFetch(page = 1, callback, options) {
    axios
      .post('https://499crohm59.execute-api.us-east-1.amazonaws.com/dev/blog/graphql', `{"query": "{ posts { id, title, bodyContent } }"}`)
      .then(({ data }) => {
        const posts = data.data.posts;
        callback(posts.map((post) => {
          return {
            title: post.title,
            body: post.bodyContent,
          };
        }), { allLoaded: true });
      })
      .catch((error) => {
        console.error('ERROR', error);
      });
  }

  _renderRowView(rowData) {
    return (
      <View style={cardS.container}>
        <Text>{rowData.title}</Text>
        <Text>{rowData.body}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={headerS.container}>          
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <GiftedListView
            rowView={this._renderRowView}
            onFetch={this._onFetch}
            firstLoader={true} // display a loader for the first fetching
            pagination={true} // enable infinite scrolling using touch to load more
            refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
            withSections={false} // enable sections
            paginationAllLoadedView={() => <View />}
            customStyles={{
              refreshableView: {
                  backgroundColor: '#fefefe',
              },
            }}
          />
        </View>
      </View>
    );
  }
}

const headerS = {
  container: {
    height: 80,
    backgroundColor: 'teal',
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 0
    },
  }
};

const cardS = {
  container: {
    height: vh * 15,
    width: vw * 90,
    marginTop: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BlogListing', () => BlogListing);
