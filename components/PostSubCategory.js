import React from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop:10,
    flexDirection: "row",
    alignSelf: "baseline",
    backgroundColor: "#4CA493",
    paddingBottom: 10
  },
  scroll: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  tab: {
    alignSelf: "baseline",
    justifyContent: "center",
  },
  tabActive: {
    alignSelf: "baseline",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  tabText: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontFamily:"NanumR"
  },
  selectedTabText: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontFamily:"NanumB"
  },
});

class ProductSubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: this.props.tabArray,
    };
  }

  render() {
    var tabView = [];
    this.state.tabs.forEach((item, idx) => {
      let cssArr = [styles.tab];
      if (item === this.props.value) {
        cssArr.push(styles.tabActive);
      }
      tabView.push(
        <TouchableHighlight
          underlayColor={"#f4f4f4"}
          key={idx}
          style={cssArr}
          onPress={() => this.props.onChange(item)}
        >
          {item === this.props.value?
          <Text style={styles.selectedTabText}>{item}</Text>
          :<Text style={styles.tabText}>{item}</Text>}
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {tabView}
        </ScrollView>
      </View>
    );
  }
}

module.exports = ProductSubCategory;
