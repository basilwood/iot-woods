const getElement = function (str, checkListState) {
  return { name: str, checked: false, id: checkListState.id }; 
};

const processNextCommand = function (str, component, checkListState) {
  //component.setPreviousState();
  const items = getElement(str, checkListState);
  checkListState.vars.push(items);
  processCommon(component, checkListState);
  //checkListState.tempid = checkListState.id;
  return checkListState.id + 1;
};

const processUndoCommand = function (str, component, checkListState) {
  //component.setPreviousState();
  const items = getElement(str, component, checkListState);
  checkListState.vars.pop(items);
  processCommon(component, checkListState);
  component.inputStateToNull();
  return undoNotNegativeProcess(checkListState.id); 
};

const processClearCommand = function (str, component, checkListState) {
  component.clearDisplay('textBox');
  component.inputStateToNull();
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

const speechProcessors = {
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
  const all = [];
  Object.keys(speechProcessors).forEach((key) => {
     all.push(key);
  });
  return all;
};
