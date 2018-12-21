import React, { Component } from "react";
import ItunesElementContent from "../../components/ItunesElementContent/ItunesElementContent";
import { connect } from "react-redux";
import { checkIfSelectedMediaItemExists } from "../../store/actions";

/**
 * @desc Itunes Element Container, contains detaild page view.
 */
class ItunesElement extends Component {
  constructor(props) {
    super(props);
    this.props.checkIfSelectedMediaItemExists();
  }
  render() {
    return this.props.mediaItem ? (
      <ItunesElementContent content={this.props.mediaItem} />
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    mediaItem: state.media.selectedMediaItem
  };
};

export default connect(
  mapStateToProps,
  { checkIfSelectedMediaItemExists }
)(ItunesElement);
