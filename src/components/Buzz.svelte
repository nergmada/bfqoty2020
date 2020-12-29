<script>
    import { player } from 'lib/store';
    import * as assets from 'assets';
    let name = null;
    $player.addListener('buzzed', data => {
        const audio = new Audio(assets[data.sound]);
        audio.play().then(v => {
            setTimeout(() => {
                audio.pause();
            }, 3000);
        });
        name = data.name;
        setTimeout(() => {
            name = null;
        }, 3000);
    });
</script>

{#if name}
    <div class="wrapper">
        <p>{name}</p>
    </div>
{/if}

<style>
    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #0000006c;
        vertical-align: middle;
        text-align: center;
    }
    p {
        font-size: 80px;
        text-transform: uppercase;
        display: inline-block;
        border-radius: 5px;
        padding: 20px;
        background-color: #000000;
        margin: auto;
        margin-top: calc(50vh - 40px);
    }
</style>