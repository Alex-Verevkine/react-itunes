import React, { Component } from "react";
import { connect } from "react-redux";
import ItunesSearchBar from "../../components/ItunesSearchBar/ItunesSearchBar";
import ResultsArea from "../../components/ResultsArea/ResultsArea";
import Spinner from "../../components/UI/Spinner/Spinner";
import {
  searchMediaByTerm,
  selectMedia,
  getTopNTerms,
  closeTopTermsDialog
} from "../../store/actions";

/**
 * @desc Search Board Container, holds all search itunes state data.
 */
class SearchBoard extends Component {
  state = {
    searchTerm: "",
    topSearchedTermsAmount: 10
  };

  /**
   * @desc Updates searchTerm parameter on the state with new value.
   * @param  {} event  Current element event object.
   */
  searchTermChangedHandler = event => {
    this.setState({ searchTerm: event.target.value });
  };

  /**
   * @desc Request results by provided searchTerm XHR Request Event Handler.
   */
  searchSubmitHandler = async () => {
    this.props.searchMediaByTerm(this.state.searchTerm);
  };

  /**
   * @desc Routes to Detailed Itunes Object Page.
   * @param  {} mediaData Selected Itunes Object
   */
  cardClickHandler = mediaData => {
    this.props.selectMedia(mediaData);
  };

  showTopSearchesHandler = async () => {
    this.props.getTopNTerms(this.state.topSearchedTermsAmount);
    this.setState({ isTopTermsDialogOpened: true });
  };

  choosedTermHandler = async choosedTerm => {
    this.setState(
      {
        searchTerm: choosedTerm
      },
      () => {
        this.props.closeTopTermsDialog();
        this.searchSubmitHandler();
      }
    );
  };

  topTermsDialogClosedHandler = () => {
    this.props.closeTopTermsDialog();
  };

  render() {
    let resultsArea = this.props.media.results ? (
      <ResultsArea
        content={this.props.media.results}
        cardClicked={this.cardClickHandler}
      />
    ) : null;
    if (this.props.isLoading) {
      resultsArea = <Spinner />;
    }

    let searchBoardContent = this.props.isLoggedIn ? (
      <>
        <ItunesSearchBar
          userId={this.props.userId}
          searchTerm={this.state.searchTerm}
          valueChanged={event => {
            this.searchTermChangedHandler(event);
          }}
          submitted={this.searchSubmitHandler}
          showTopSearches={this.showTopSearchesHandler}
          topTerms={this.props.topTerms}
          choosedTerm={this.choosedTermHandler}
          closed={this.topTermsDialogClosedHandler}
          isTopTermsDialogOpened={this.props.isTopTermsDialogOpened}
        />
        {resultsArea}
      </>
    ) : null;
    return <>{searchBoardContent}</>;
  }
}

const mapStateToProps = state => {
  return {
    topTerms: state.media.topTerms,
    isLoggedIn: state.auth.isLoggedIn,
    userId: state.auth.user._id,
    media: state.media.media,
    isLoading: state.ui.isLoading,
    isTopTermsDialogOpened: state.ui.isTopTermsDialogOpened
  };
};

export default connect(
  mapStateToProps,
  { searchMediaByTerm, selectMedia, getTopNTerms, closeTopTermsDialog }
)(SearchBoard);
