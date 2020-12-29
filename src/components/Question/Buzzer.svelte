<script>
    import {player} from 'lib/store';
    export let id = "";
</script>

<div>
    <button on:click={() => {
        $player.buzz(id);
    }}>Buzz</button>
</div>

<style>
    div {
        text-align: center;
        padding: 40px;
    }

    button {
        background-color: #ff0000;
        width: 300px;
        height: 300px;
        border-radius: 150px;
        font-size: 40px;
        color: #ffffff;
        text-transform: capitalize;
        text-align: center;
        outline: none;
        border-width: 10px;
        cursor: pointer;
    }
</style>