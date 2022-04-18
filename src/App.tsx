import { Component, createEffect, createSignal,  } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { Point } from './components/Point';
import { Points } from './components/Points';
import { IncreseablePoint } from './models/IncreaseablePoint';
import { xpStore$ } from './store/xp.store';
import { useSubscribe } from './hooks/useSubscribe.hook';
import { createAttributeStore } from './store/attribute.store';
import { Attribute, AttributeType } from './models/Attribute';

const point = new (class extends IncreseablePoint {})(0, 5, 5);

const {store$, set$} = createAttributeStore(
    new Attribute('intelligence', 'Intelligence', AttributeType.mental, 1)
)
const App: Component = () => {
    const xpState = useSubscribe(xpStore$);
    const attributeState = useSubscribe(store$);
  return (
      <div>
          {xpState()?.xp}
          {xpState()?.tempXp}
        <div class={styles.App}>
            {attributeState()?.tempValue && <Points point={attributeState()?.tempValue!} set={(n) => set$.next(n)}/>}
        </div>
      </div>
  );
};

export default App;
