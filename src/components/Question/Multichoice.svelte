<script>
    import {player} from 'lib/store';
    import Submit from './Submit.svelte';
    export let qId = "";
    export let options = [];
    export let submitted = () => {};
    let answer = '';
</script>

<div>
    {#each options as option}
        <div class="option" on:click={() => answer=option }>
            <label>
                <input bind:group={answer} value={option} type="radio" name="answer">
                {option}
            </label>
        </div>
    {/each}
    <Submit on:click={() => {
        $player.answer({
            answer,
            qId,
        })
        submitted();
    }}/>
</div>

<style>
    div {
        width: 100%;
        padding: 10px;
    }
    .option {
        padding: 20px;
        background: #fff;
        color: #000;
        margin-top: 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        border-radius: 5px;
    }
    .option:hover {
        background: #ddd;
        cursor: pointer;
    }
</style>