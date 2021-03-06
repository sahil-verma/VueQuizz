import axios from "axios";

export class QuizApiService {

    // declaring the quizAPI variable
    quizAPI: any;

    constructor() {
        // instansiate the axios instance for making api requests
        this.quizAPI = axios.create({
            baseURL: 'http://localhost:32490/api/'
        });

        // test connection on creation
        //this.testConnection();
    }

    // TEST: testing api connection
    testConnection (): void {
        // GET: making a test get request
        this.quizAPI.get('questions/test')
        .then((response: any) => console.log(`
            QuizWebApi test connection successful
            ==========================
            Test response: ${response.data}
            `))
        .catch((error: any) => this.handleRequestErrors(error));
    }

    //GET: get a list of questions
    getQuestions() {
        return this.quizAPI.get('questions');
    }

    //POST: post a question
    postQuestion(question: any) {
        console.log("Posting a new question");
        return this.quizAPI.post('questions', question)
        .then((response: any) => console.log("Response status", response.status))
        .catch((error: any) => this.handleRequestErrors(error));
    }

    //PUT: make a put request
    putQuestion(question: any) {
        console.log("Editing the question", question);
        return this.quizAPI.put(`questions/${question.id}`, question)
        .then((response: any) => console.log("Response status", response.status))
        .catch((error: any) => this.handleRequestErrors(error));
    }

    //DELETE: delete a question
    deleteQuestion(question: any) {
        console.log("Deleting the question", question);
        return this.quizAPI.delete(`questions/${question.id}`)
        .then((response: any) => console.log("Response status", response.status))
        .catch((error: any) => this.handleRequestErrors(error));
    }

    handleRequestErrors(error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(`
            QuizWebApi connection testing failed
            ====================================
            Error data: ${JSON.stringify(error.response.data)}
            Error status: ${error.response.status}
            Error headers: ${JSON.stringify(error.response.headers)}
            `);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(`
            QuizWebApi connection testing failed
            ====================================
            Error Request: ${JSON.stringify(error.request)}
            `);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log(`
            QuizWebApi connection testing failed
            ====================================
            Error Request: ${error.message}
            `);
        }
        console.log("Error config", error.config);
    }
}