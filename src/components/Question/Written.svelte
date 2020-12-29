<script>
    import {player} from 'lib/store';
    import Submit from './Submit.svelte';
    export let qId = "";
    export let submitted = () => {};
    let value = "";
</script>
<div>
    <textarea bind:value />
    <Submit on:click={() => {
        $player.answer({
            answer: value,
            qId,
        })
        submitted();
    }} />
</div>

<style>
    div {
        width: 100%;
    }
    textarea {
        width: 100%;
        min-height: 200px;
        font-size: 18px;
    }
</style>