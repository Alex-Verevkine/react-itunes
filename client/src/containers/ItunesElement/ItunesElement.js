import React, { Component } from "react";
import ItunesElementContent from "../../components/ItunesElementContent/ItunesElementContent";
import { connect } from "react-redux";

/**
 * @desc Itunes Element Container, contains detaild page view.
 */
class ItunesElement extends Component {
  constructor(props) {
    super(props);
    if (!props.content) {
      props.history.replace("/");
    }
  }
  //   componentWillMount() {}

  render() {
    let elementContent = this.props.content ? (
      <ItunesElementContent content={this.props.content} />
    ) : null;
    return <>{elementContent}</>;
    //   <div>
    //     itunes Element {this.props.content && this.props.content.trackId}
    //   </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("test state", state);
  return {
    content: state.itunesContent.content.find(element => {
      return element.trackId.toString() === ownProps.match.params.elementId;
    })
  };
};

export default connect(mapStateToProps)(ItunesElement);
