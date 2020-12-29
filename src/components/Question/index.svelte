<script>
    import { player } from 'lib/store';
    import Multichoice from './Multichoice.svelte';
    import Written from './Written.svelte';
    import Buzzer from './Buzzer.svelte';
    import Loading from './Loading.svelte';
    import Waiting from './Waiting.svelte';

    $: currentQuestion = null;

    $player.addListener('question', (data) => {
        currentQuestion = data;
    })

    const submitted = () => {
        currentQuestion = "waiting"
    };
    
</script>

<div>
    {#if currentQuestion && currentQuestion.questionType && currentQuestion.question}
        <h2>
            {currentQuestion.question}
        </h2>
        {#if currentQuestion.questionType == 'multichoice'}
            <Multichoice 
                submitted={submitted}
                qId={currentQuestion._id}
                options={currentQuestion.options} />
        {:else if currentQuestion.questionType == 'written'}
            <Written 
                qId={currentQuestion._id}
                submitted={submitted} />
        {:else if currentQuestion.questionType == 'buzz'}
            <Buzzer 
                submitted={submitted}
                id={currentQuestion._id} />
        {:else}
            <Loading />
        {/if}
    {:else if currentQuestion == "waiting"}
        <Waiting />
    {:else}
        <Loading />
    {/if}
</div>

<style>
    div {
        background-color: #0000006c;
        padding: 20px;
        border-radius: 5px;
    }
</style>