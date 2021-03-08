import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";

/* Use this if you are using Expo
import * as Svg from 'react-native-svg';
const { Circle, Rect } = Svg;
*/

import React from "react";

const getNumberTreeLeave = (node: { nodes: any }) => {
  if (!node.nodes || node.nodes.length < 0) {
    return 1;
  }
  return node.nodes.reduce(
    (total: any, child: any) => total + getNumberTreeLeave(child),
    0
  );
};

const getNumberTreeFloor = (node: { nodes: any }, level: number) => {
  if (!node.nodes || node.nodes.length < 0) {
    return level + 1;
  }
  return Math.max(
    ...node.nodes.map((child: any) => getNumberTreeFloor(child, level + 1))
  );
};

const calcTreeWidth = (
  numberNode: number,
  nodeWidth: number,
  nodeSpace: number
) => {
  return numberNode * nodeWidth + (numberNode - 1) * nodeSpace;
};

const getTreeWidth = (tree: any, nodeWidth: any, nodeSpace: any) => {
  const numberLeaves = getNumberTreeLeave(tree);
  return calcTreeWidth(numberLeaves, nodeWidth, nodeSpace);
};

const getTreeHeight = (tree: any, nodeHeight: any, floorHeight: any) => {
  const numberFloor = getNumberTreeFloor(tree,1);
  return calcTreeWidth(numberFloor, nodeHeight, floorHeight);
};

export default class OrgChart extends React.Component {
  state = {
    canvasWidth: this.getTreeWidth(this.props),
    canvasHeight: this.getTreeHeight(this.props),
  };

  getTreeWidth(props: Readonly<{}> & Readonly<{ children?: React.ReactNode }>) {
    const { nodeWidth, nodeHeight, floorHeight, nodeSpace, tree }: any = props;
    return getTreeWidth(tree, nodeWidth, nodeSpace);
  }

  getTreeHeight(
    props: Readonly<{}> & Readonly<{ children?: React.ReactNode }>
  ) {
    const { nodeWidth, nodeHeight, floorHeight, nodeSpace, tree }: any = props;
    return getTreeHeight(tree, nodeHeight, floorHeight);
  }

  componentWillReceiveProps(nexProps: any) {
    const canvasWidth = this.getTreeWidth(nexProps);
    const canvasHeight = this.getTreeHeight(nexProps);
    this.setState({
      canvasWidth,
      canvasHeight,
    });
  }

  renderNode({ node, level, index, offsetX }: any) {
    const { canvasWidth } = this.state;
    const {
      nodeWidth,
      nodeHeight,
      floorHeight,
      nodeSpace,
      NodeComponent,
    }: any = this.props;
    const { nodes } = node;
    const numberChild = (nodes && nodes.length) || 0;
    const branchWidth = getTreeWidth(node, nodeWidth, nodeSpace);
    return (
      <G x={index * (branchWidth + nodeSpace)} y={0}>
        {level > 0 && (
          <G>
            <Line
              stroke="red"
              strokeWidth="1"
              x1={Math.floor(nodeWidth / 2)}
              y1={0}
              x2={Math.floor(nodeWidth / 2)}
              y2={floorHeight}
            />
          </G>
        )}
        <G x={0} y={floorHeight}>
          <NodeComponent {...node} {...this.props} />
        </G>
        <G y={nodeHeight}>
          {numberChild > 0 && (
            <Line
              stroke="red"
              strokeWidth="1"
              x1={Math.floor(nodeWidth / 2)}
              y1={floorHeight}
              x2={Math.floor(nodeWidth / 2)}
              y2={2 * floorHeight}
            />
          )}
          {numberChild > 1 && (
            <Line
              stroke="red"
              strokeWidth="1"
              x1={0}
              y1={2 * floorHeight}
              x2={branchWidth}
              y2={2 * floorHeight}
            />
          )}
        </G>
        <G y={nodeHeight + 2 * floorHeight}>
          {nodes &&
            nodes.map((node: any, index: any) =>
              this.renderNode({ node, index, level: level + 1 })
            )}
        </G>
      </G>
    );
  }

  render() {
    const { canvasWidth, canvasHeight } = this.state;
    const {
      tree,
      NodeComponent,
      nodeWidth,
      nodeSpace,
      nodeHeight,
      floorHeight,
    }: any = this.props;
    const { nodes } = tree;
    return (
      <Svg
        height="80%"
        width="80%"
        viewBox={`0 0 ${2 * canvasWidth} ${2 * canvasHeight}`}
      >
        {(nodes || []).map((node: any, index: any) =>
          this.renderNode({ node, index, level: 0, offsetX: 0 })
        )}
      </Svg>
    );
  }
}
