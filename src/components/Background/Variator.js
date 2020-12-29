import {tweened} from 'svelte/motion';

export default (value, range = 20) => {
    range = 0;
    //create store
    const store = tweened(value, {
        duration: 1000
    });
    //set min variance
    const min = value - (range / 2);
    //set target to current
    let target = value;
    //add new target function to store
    store.newTarget = () => {
        target = (Math.random() * range) + min;
        store.set(target);
    };
//
    ////create roundabout when current value ~= target
    store.subscribe(v => {
        if (Math.abs(v - target) < 1) {
            store.newTarget();
        }
    });

    return store;
}
