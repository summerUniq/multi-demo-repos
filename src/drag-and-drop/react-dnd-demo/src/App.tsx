import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragList from './pages/components/dragList/drag-list'
function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <DragList/>
      </DndProvider>
    </div>
  );
}

export default App;
