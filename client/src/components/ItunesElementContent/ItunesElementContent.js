import React from "react";
import ItunesElementDescription from "./ItunesElementDescription/ItunesElementDescription";
const itunesElementContent = props => {
  return (
    <>
      <ItunesElementDescription content={props.content} />
    </>
  );
};

export default itunesElementContent;
