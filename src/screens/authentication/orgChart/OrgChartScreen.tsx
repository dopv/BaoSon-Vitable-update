import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import OrgChart from "./component/OrgChart";
import NodeComponent from "./component/NodeComponent";

const tree = {
  nodes: [
    {
      text: "node 0",
      nodes: [
        {
          text: "node 1",
          nodes: [
            {
              text: "node 2",
            },
          ],
        },
        {
          text: "node 3",
          nodes: [
            {
              text: "node 4",
            },
          ],
        },
      ],
    },
  ],
};

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <OrgChart
          tree={tree}
          nodeWidth={16}
          nodeHeight={5}
          floorHeight={4}
          nodeSpace={4}
          NodeComponent={NodeComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
