const isElementInViewport = (el, inViewType = "whole") => {
  // get elementRect ,viewport-width and viewport-height
  let _elBCRect = el.getBoundingClientRect();
  if (_elBCRect.width == 0 || _elBCRect.height == 0) return false;
  let _elTop = Math.round(_elBCRect.top),
    _elBottom = Math.round(_elBCRect.bottom),
    _elLeft = Math.round(_elBCRect.left),
    _elRight = Math.round(_elBCRect.right);

  let _viewportHeight = document.documentElement.clientHeight || window.innerHeight,
    _viewportWidth = document.documentElement.clientWidth || window.innerWidth;

  // Caculate is el's edges in viewport?
  let _isElTopInViewport = _elTop >= 0 && _elTop <= _viewportHeight,
    _isElBottomInViewport = _elBottom >= 0 && _elBottom <= _viewportHeight,
    _isElLeftInViewport = _elLeft >= 0 && _elLeft <= _viewportWidth,
    _isElRightInViewport = _elRight >= 0 && _elRight <= _viewportWidth;

  if (inViewType == "block") return (_isElTopInViewport || _isElBottomInViewport) && (_isElLeftInViewport || _isElRightInViewport);
  //whole
  else return _isElTopInViewport && _isElBottomInViewport && _isElLeftInViewport && _isElRightInViewport;
  // console.log("is top in viewport : ", _isElTopInViewport);
  // console.log("is bottom in viewport : ", _isElBottomInViewport);
  // console.log("is left in viewport : ", _isElLeftInViewport);
  // console.log("is right in viewport : ", _isElRightInViewport);
  // console.log("is el block in viewport : ", (_isElTopInViewport || _isElBottomInViewport) && (_isElLeftInViewport || _isElRightInViewport));
  // console.log("is whole element in viewport : ", _isElTopInViewport && _isElBottomInViewport && _isElLeftInViewport && _isElRightInViewport);
};

const scrollInfo_InnerFunc = (_el) => {
  let _getScrollX = () => {
      return Math.round(window.pageXOffset || _el.scrollLeft);
    },
    _getScrollY = () => {
      return Math.round(window.pageYOffset || _el.scrollTop);
    };

  let _preXPos = _getScrollX(),
    _preYPos = _getScrollY();

  return () => {
    let _scrollAxis = "",
      _scrollDirection = "";
    let _curXPos = _getScrollX(),
      _curYPos = _getScrollY();

    _scrollAxis = _preYPos != _curYPos ? "y" : _preXPos != _curXPos ? "x" : "none";
    let _direction = _scrollAxis == "y" ? _curYPos - _preYPos : _scrollAxis == "x" ? _curXPos - _preXPos : 0; //0 means none;
    _scrollDirection = _direction > 0 ? "forward" : _direction != 0 ? "reverse" : "none";

    _preXPos = _curXPos;
    _preYPos = _curYPos;
    return {
      axis: _scrollAxis,
      direction: _scrollDirection,
    };
  };
};

export default isElementInViewport;
export { scrollInfo_InnerFunc };
