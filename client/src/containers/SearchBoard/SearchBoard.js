import React, { Component } from "react";
import { connect } from "react-redux";
import ItunesSearchBar from "../../components/ItunesSearchBar/ItunesSearchBar";
import ResultsArea from "../../components/ResultsArea/ResultsArea";
import AxiosDBInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionTypes from "../../store/actions";
import util from "util";
class SearchBoard extends Component {
  state = {
    searchTerm: "",
    isLoading: false,
    topTerms: []
  };

  searchTermChangedHandler = event => {
    this.setState({ searchTerm: event.target.value });
  };

  searchSubmitHandler = async () => {
    try {
      this.setState({ isLoading: true });

      const res = await AxiosDBInstance.get(
        `/itunes/getItune/${encodeURI(this.state.searchTerm)}`
      );
      this.props.onSetResult(res.data.obj.results);
      await AxiosDBInstance.put(
        `/user/updateQueries/${
          this.props.storeData.userPersonal.userPersonalData._id
        }`,
        {
          searchQuery: this.state.searchTerm
        }
      );
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    }
  };

  cardClickHandler = cardId => {
    this.props.history.push(`/${cardId}`);
  };

  showTopSearchesHandler = async () => {
    try {
      const topTerms = await AxiosDBInstance.get(
        `/user/terms/${this.props.storeData.userPersonal.userPersonalData._id}`
      );
      this.setState({ topTerms: topTerms.data.obj });
    } catch (error) {
      console.log(error);
    }
  };

  choosedTermHandler = async choosedTerm => {
    try {
      this.setState(
        {
          searchTerm: choosedTerm,
          topTerms: []
        },
        () => {
          this.searchSubmitHandler();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  topTermsDialogClosedHandler = () => {
    this.setState({ topTerms: [] });
  };

  render() {
    let resultsArea = this.props.storeData.itunesContent.content.length ? (
      <ResultsArea
        content={this.props.storeData.itunesContent.content}
        cardClicked={this.cardClickHandler}
      />
    ) : null;
    if (this.state.isLoading) {
      resultsArea = <Spinner />;
    }

    let searchBoardContent = this.props.storeData.userPersonal.isLogedIn ? (
      <>
        <ItunesSearchBar
          userId={
            this.props.storeData.userPersonal.userPersonalData &&
            this.props.storeData.userPersonal.userPersonalData._id
          }
          searchTerm={this.state.searchTerm}
          valueChanged={event => {
            this.searchTermChangedHandler(event);
          }}
          submitted={this.searchSubmitHandler}
          showTopSearches={this.showTopSearchesHandler}
          topTerms={this.state.topTerms}
          choosedTerm={this.choosedTermHandler}
          closed={this.topTermsDialogClosedHandler}
        />
        {resultsArea}
      </>
    ) : null;
    return <>{searchBoardContent}</>;
  }
}

const mapStateToProps = state => {
  return {
    storeData: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetResult: result => dispatch({ type: actionTypes.SET, result })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBoard);
