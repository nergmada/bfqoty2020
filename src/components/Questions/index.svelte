<script>
    import {player} from 'lib/store';
    import Dropdown from './Dropdown.svelte';
    import Question from './Question.svelte';
    $: questions = {};

    $player.addListener('all-questions', (data) => {
        console.log(data);
        questions = data.reduce((prev, curr) => {
            return {
                ...prev,
                [curr.round]: prev[curr.round] ? [...prev[curr.round], curr] : [curr]
            }
        }, {});
    });
</script>


<div class="frame">
    {#each Object.keys(questions) as round}
        <Dropdown title={round}>
            {#each questions[round] as question}
                <Question 
                    id={question._id}
                    finished={question.finished} 
                    question={question.question}
                    points={question.points}
                    ans={question.answer}
                    answers={question.answers} />
            {/each}
        </Dropdown>
    {/each}
</div>

<style>
    .frame {
        background: #0000006c;
        border-radius: 5px;
        overflow-y: scroll;
        max-height: 60vh;
    }
</style>