import { ChatWebLLM } from '@langchain/community/chat_models/webllm';
import { HumanMessage } from '@langchain/core/messages';

async function init() {
    const pEl = document.querySelector('.progress');

    const questionBtn = document.querySelector('.question-btn');
    const inputEL = document.getElementById('input');
    const responseEl = document.querySelector('.response');

    questionBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const response = await model.invoke([
            new HumanMessage({ content: inputEL.value }),
        ]);
        inputEL.value = '';
        console.log(response);
        responseEl.textContent = response.content;
    });

    const model = new ChatWebLLM({
        model: 'TinyLlama-1.1B-Chat-v1.0-q4f32_1-MLC-1k',
        chatOptions: {
            temperature: 0.5,
        },
    });
    await model.initialize((progress) => {
        console.log(progress);
        pEl.textContent = progress.text;
    });
}

init();
