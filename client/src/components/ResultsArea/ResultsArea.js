import React from "react";
import ResultCard from "./ResultCard/ResultCard";
import classes from "./ResultsArea.scss";
const resultsArea = props => {
  return (
    <section className={classes.ResultsArea}>
      {props.content.map(element => (
        <article key={element.trackId} className={classes.ResultItem}>
          <ResultCard
            cardData={element}
            clicked={() => {
              props.cardClicked(element.trackId);
            }}
          />
        </article>
      ))}
    </section>
  );
};

export default resultsArea;
