import React from "react";
import ResultCard from "./ResultCard/ResultCard";
import classes from "./ResultsArea.scss";

/**
 * @desc Itunes Requested Results Cards Area Component.
 */
const resultsArea = props => {
  return (
    <section className={classes.ResultsArea}>
      {props.content.map(element => (
        <article key={element.trackId} className={classes.ResultItem}>
          <ResultCard
            cardData={element}
            clicked={() => {
              props.cardClicked(element);
            }}
          />
        </article>
      ))}
    </section>
  );
};

export default resultsArea;
