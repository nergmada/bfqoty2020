import SocketIO from 'socket.io-client';


export default class Player {
    constructor(name, admin = false) {
        this.name = name;
        this.listeners = {};
        
        this.io = SocketIO(`ws://${window.location.host}`);
        //on connection
        this.io.on('connect', () => {
            if (admin) this.io.emit('admin', { name });
            else this.io.emit('identity', { name });
        });
        
        //Handle leaderboard update event
        this.io.on('leaderboard', (event) => this.leaderboard(event));
        //Handle new question
        this.io.on('question', (event) => this.question(event));
        this.io.on('buzzed', (event) => this.buzzed(event));
        this.io.on('banker', (event) => this.newBanker(event));
        this.io.on('bank-tier', (event) => this.bankTier(event));
        this.io.on('bank-total', (event) => this.bankTotal(event));
        if (admin) {
            this.io.on('all-questions', (event) => this.allQuestions(event));
        }
        //emitting identity request

    }

    addListener(event, callback) {
        if (this.listeners[event]) this.listeners[event].push(callback);
        else this.listeners[event] = [callback];
    }

    //calls event handlers for a leaderboard update
    leaderboard(event) {
        if (this.listeners['leaderboard']) 
            this.listeners['leaderboard'].forEach(cb => cb(event));
    }

    //calls event handler for a new question
    question(event) {
        if (this.listeners['question']) 
            this.listeners['question'].forEach(cb => cb(event));
    }

    allQuestions(event) {
        if (this.listeners['all-questions'])
            this.listeners['all-questions'].forEach(cb => cb(event));
    }

    newBanker(event) {
        if (this.listeners['new-banker'])
            this.listeners['new-banker'].forEach(cb => cb(event));
    }

    bankTier(event) {
        if (this.listeners['bank-tier'])
            this.listeners['bank-tier'].forEach(cb => cb(event));
    }

    bankTotal(event) {
        if (this.listeners['bank-total'])
            this.listeners['bank-total'].forEach(cb => cb(event));
    }
    
    buzzed(event) {
        if (this.listeners['buzzed'])
        this.listeners['buzzed'].forEach(cb => cb(event));
    }
    
    buzz(id) {
        this.io.emit('buzz', {
            name: this.name,
            id
        })
    }

    bank() {
        console.log("banking");
        this.io.emit('bank', null);
    }

    answer(answerData) {
        if (this.io.connected) {
            this.io.emit('answer', {
                ...answerData,
                name: this.name,
            });
        } else {
            console.log("Something went wrong");
        }
    }

    setQuestion(qId) {
        this.io.emit('set-question', qId);
    }

    markFinished(qId) {
        this.io.emit('mark-finished', qId);
    }

    forceScore(name, qId, answer, correct) {
        this.io.emit('answer', {
            name,
            qId,
            answer,
            correct
        });
    }

    getName() {
        return this.name;
    }

}