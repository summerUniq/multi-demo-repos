import { useEffect } from 'react';
import { connectToRteBox, getRteUiWidgetList, mountRteUiWidgets, openBidirectionalChannelToRte, RteContext } from 'rte-controller'

function App() {
  useEffect(() => {
    mountUi()
  }, [])

  async function mountUi(): Promise<void> {
    const rteContext: RteContext = {};

    // Get UI widget list from the specified proc of the box.
    const uiWidgetList = await getRteUiWidgetList(
      'http://127.0.0.1:8001/',
      '0',
      'ui_gateway_proc_group',
      'ui_gateway_proc',
    );

    // Mount fetched UI widgets into DOM.
    await mountRteUiWidgets(
      rteContext,
      uiWidgetList,
      document.getElementById('ui-container') as HTMLElement,
    );

    // Connect to RTE box.
    rteContext.ws = await connectToRteBox(rteContext, 'http://127.0.0.1:8001/');

    await openBidirectionalChannelToRte(
      rteContext,
      'http://127.0.0.1:8001/',
      '0',
      'ui_gateway_proc_group',
      'ui_gateway_proc',
    );
  }

  return (
    <div className="App" id='ui-container'>
      app
    </div>
  );
}

export default App;
