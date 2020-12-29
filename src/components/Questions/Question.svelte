<script>
    import {player} from 'lib/store';

    export let id = "";
    export let question = "";
    export let points = 0;
    export let ans = "";
    export let answers = [];
    export let finished = false;
    console.log(answers);
</script>

<div class="question">
    <div class="info"> 
        <p>{question}</p>
        <p>points: {points}</p>
        <p>Answer: {ans}</p>
        <p>{finished ? 'Completed' : 'Incomplete'}</p>
    </div>
    <div class="actions">
        <button on:click={() => $player.setQuestion(id)}>Show</button>
        <button on:click={() => $player.markFinished(id)}>Finish</button>
    </div>
    <div class="answers">
        {#each answers as a}
            <p>
                {a.name}: 
                {a.answer ? a.answer.answer : 'No Answer'} 
                Correct?: {a.answer ? a.answer.correct : 'n/a'} 
                <button on:click={() => {
                    $player.forceScore(a.name, id, a.answer ? a.answer.answer : 'admin marked correct', true);
                }}>Correct</button> 
                <button on:click={() => {
                    $player.forceScore(a.name, id, a.answer ? a.answer.answer : 'admin marked incorrect', false);
                }}>Incorrect</button>
            </p>
        {/each}
    </div>
</div>


<style>
    .answers {
        width: 100%;
    }
    .question {
        width: 100%;
        background: #fff;
        color: #000;
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 18px;
        padding: 5px;
        border-radius: 5px;
        vertical-align: middle;
    }
    p {
        margin: 0;
    }
    .info {
        display: inline-block;
        width: 85%;
    }
    .actions {
        display: inline-block;
        width: 10%;
        text-align: center;
    }
    button {
        background: none;
        border-radius: 0;
        padding: 5px;
        margin-bottom: 5px;
        margin-top: 5px;
    }

</style>