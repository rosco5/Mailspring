import React from 'react';
import PropTypes from 'prop-types';
import { UndoRedoStore } from 'mailspring-exports';
import { UndoToast, ListensToFluxStore } from 'mailspring-component-kit';

function onUndo() {
  AppEnv.commands.dispatch('core:undo');
}

function UndoRedoThreadListToast(props) {
  const { tasks } = props;
  return (
    <UndoToast
      {...props}
      onUndo={onUndo}
      visibleDuration={3000}
      className="undo-redo-thread-list-toast"
      undoMessage={tasks.map(t => t.description()).join(', ')}
    />
  );
}

UndoRedoThreadListToast.displayName = 'UndoRedoThreadListToast';
UndoRedoThreadListToast.containerRequired = false;
UndoRedoThreadListToast.propTypes = {
  tasks: PropTypes.array,
};

export default ListensToFluxStore(UndoRedoThreadListToast, {
  stores: [UndoRedoStore],
  getStateFromStores() {
    const tasks = UndoRedoStore.getMostRecent();
    return {
      tasks,
      visible: tasks && tasks.length > 0,
    };
  },
});
