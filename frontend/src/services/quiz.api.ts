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
        this.testConnection();
    }

    //GET: make a get request for questions
    testConnection (): void {
        console.log("Called");
        // TEST: testing api connection
        this.quizAPI.get('questions')
        .then((response:any) => console.log(`
            QuizWebApi test connection successful
            ==========================
            Test response: ${response.data}
            `))
        .catch((error: any) => {
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
        })
    }

    //POST: post a question
    postQuestion(question: Object) {
        console.dir(question);
    }
}