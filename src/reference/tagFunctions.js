function searchContenteditableTag(_baseTag) {
  let _retTag = undefined;
  if (_baseTag.contentEditable == "true") return _baseTag;

  for (let i in _baseTag.childNodes) {
    _retTag = searchContenteditableTag(_baseTag.childNodes[i]);
    if (_retTag) break;
  }
  return _retTag;
}

export { searchContenteditableTag };
