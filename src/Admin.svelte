<script>
    import Title from 'components/Title';
    import Question from 'components/Question';
    import Questions from 'components/Questions';
    import Leaderboard from 'components/Leaderboard.svelte';
    import Bank from 'components/Bank.svelte';
    import Background from 'components/Background';

    import Buzz from 'components/Buzz.svelte';

    import { player } from 'lib/store';
    import Player from 'lib/player';

    export let name = '';
    $player = new Player(name, true);
</script>
<Buzz />
<Background />
<Title />
<div id="wrapper">
    <div id="bank">
        <Bank />
    </div>
    <div id="question">
        <Questions />
        <Question />
    </div>
    <div id="leaderboard">
        <Leaderboard />
    </div>
</div>

<style>
    div {
        display: inline-block;
        vertical-align: top;
    }
    #wrapper {
        width: 100%;
    }

    #bank {
        width: 14%;
    }

    #question {
        width: 59%;
    }

    #leaderboard {
        width: 24%;
    }
</style>