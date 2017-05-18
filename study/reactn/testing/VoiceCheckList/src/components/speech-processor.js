const getElement = function (str) {
  return { name: str, checked: false };
};

const processNextCommand = function (str, component, checkListState) {
  //component.setPreviousState();
  const items = getElement(str);
  checkListState.vars.push(items);
  processCommon(component, checkListState);
  return checkListState.id + 1;
};

const processUndoCommand = function (str, component, checkListState) {
  //component.setPreviousState();
  const items = getElement(str);
  checkListState.vars.pop(items);
  processCommon(component, checkListState);
  return undoNotNegativeProcess(checkListState.id); 
};

const processClearCommand = function (str, component, checkListState) {
  component.clearDisplay('textBox');
  return checkListState.id;
};

const processDeleteAllCommand = function (str, component, checkListState) {
//component.setPreviousState();
//console.log('the id is ' + this.state.id);
component.deleteTheList();
return checkListState.id;
};

const processCommon = function (component, checkListState) {
  component.setState(checkListState);
  component.clearDisplay('textBox');
  component.asyncStorageresetandSave();
};

 const undoNotNegativeProcess = function (checkListStateId) {
   if (checkListStateId > 1) {
     return checkListStateId - 1;
   } 
  return checkListStateId;
 };

var speechProcessors = {
    next: processNextCommand,
    undo: processUndoCommand,
    'delete all': processDeleteAllCommand,
    clear: processClearCommand
};

//================= Exported functions ===============================

exports.findProcessor = function (token) {
  return speechProcessors[token];
};
exports.getSpeechTokens = function () {
  var all = [];
  Object.keys(speechProcessors).forEach((key) => {
     all.push(key);
  });
  return all;
};
