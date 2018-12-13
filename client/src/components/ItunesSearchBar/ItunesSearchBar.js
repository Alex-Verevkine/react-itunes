import React from "react";
import Input from "../UI/Input/Input";
import FloatingButton from "../UI/FloatingButton/FloatingButton";
import classes from "./ItunesSearchar.scss";
import Button from "../UI/Button/Button";
import TopSearchBoard from "../UI/TopSearchBoard/TopSearchBoard";
const itunesSearchBar = props => {
  let topSearchDialog =
    !props.topTerms && !props.topTerms.length ? null : (
      <TopSearchBoard
        terms={props.topTerms}
        clicked={props.choosedTerm}
        dialogClose={props.closed}
      />
    );
  return (
    <nav className={classes.ItunesSearchBar}>
      {topSearchDialog}
      <Input
        label="Search"
        value={props.searchTerm}
        changed={props.valueChanged}
      />
      <FloatingButton clicked={props.submitted} />
      <Button
        color="secondary"
        click={props.showTopSearches}
        className={classes.TopSearch}
      >
        Top 10
      </Button>
    </nav>
  );
};

export default itunesSearchBar;
