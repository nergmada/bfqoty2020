<script>
    import {player} from 'lib/store';

    $: leaderboard = [];
    $: banker = '';
    $player.addListener('leaderboard', data => leaderboard = data);
    $player.addListener('new-banker', data => {
        banker = data;
    })
</script>
<div>
    <h2>Leaderboard</h2>
    {#each leaderboard as p, i}
        <p>{i + 1}. {p.name} {p.score} {banker == p.name ? '(banker)' : ''}</p>
    {/each}
</div>

<style>
    div {
        background: #0000006c;
        padding: 20px;
        border-radius: 5px;
    }

    p {
        background: #fff;
        color: #000;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
    }
</style>