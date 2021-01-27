import React from "react";

const PreviewPicture = (props) => {
  console.log(props);
  const { pictureUrl } = props;
  console.log("I am the preview url" + { pictureUrl });
  return <img className='img-fluid mb-2 mt-2' src={pictureUrl || ""} alt='' />;
};

export default PreviewPicture;
