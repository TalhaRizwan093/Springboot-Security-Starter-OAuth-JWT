const isSafariBrowser = () => {
  // return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  return (
    navigator.userAgent.indexOf("Safari") > -1 &&
    navigator.userAgent.indexOf("Chrome") <= -1
  );
};

export default isSafariBrowser;
