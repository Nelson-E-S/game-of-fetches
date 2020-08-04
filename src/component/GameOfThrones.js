import React, { Component } from 'react';
import axios from 'axios';

export default class GameOfThrones extends Component {
    constructor(props){
        super(props);
        this.state = {
            Questions: [
                "Where was Margaery Tyrell born?",
                "What region is House Targaryen in?",
                "What's the coat of arms of House Lannister?",
                "What is the second seat of House Baratheon?",
                "What is Robert Baratheon's second alias?",
                "What's the name of the founder of House Stark?",
                "What are the titles of Catelyn Stark's three POV books?"],
            Answers: []
        }
    }
    componentDidMount(){
        const qy1 = "https://www.anapioficeandfire.com/api/characters/16";
        const qy2 = "https://www.anapioficeandfire.com/api/houses/378";
        const qy3 = "https://www.anapioficeandfire.com/api/houses/229";
        const qy4 = "https://www.anapioficeandfire.com/api/houses/17";
        const qy5 = "https://www.anapioficeandfire.com/api/characters/901";
        const qy6 = "https://www.anapioficeandfire.com/api/characters/209";//"https://www.anapioficeandfire.com/api/houses/362";
        const qy7 = "https://www.anapioficeandfire.com/api/characters/232";

        const rq1 = axios.get(qy1);
        const rq2 = axios.get(qy2);
        const rq3 = axios.get(qy3);
        const rq4 = axios.get(qy4);
        const rq5 = axios.get(qy5);
        const rq6 = axios.get(qy6);
        const rq7 = axios.get(qy7);

        axios
            .all([rq1,rq2,rq3,rq4,rq5,rq6,rq7])
            .then(axios.spread((...responses) =>{
                const res1 = responses[0];
                const res2 = responses[1];
                const res3 = responses[2];
                const res4 = responses[3];
                const res5 = responses[4];
                const res6 = responses[5];
                const res7 = responses[6];
                
                const finalRes7 = [];
                const fr7Arr = res7.data.povBooks;
                const fr7Arr2 = [];
                fr7Arr.forEach(el => {
                    fr7Arr2.push(axios.get(el))
                })
                axios
                    .all(fr7Arr2)
                    .then(axios.spread((...responses) =>{
                        responses.forEach(el =>{
                            finalRes7.push(el.data.name)
                        })
                        this.forceUpdate()
                    }))
                //console.log(finalRes7)

                this.setState({
                    Answers: [
                        res1.data.born,
                        res2.data.region,
                        res3.data.coatOfArms,
                        res4.data.seats[1],
                        res5.data.aliases[2],
                        res6.data.name,
                        ["A Game of Thrones, ","A Clash of Kings, ","A Storm of Swords, "]
                    ]
                })
            }))
            .catch(errors=>{
                console.log(errors);
            })
    }
    render(){
        if(this.state.Answers.length === 0){
            return(
                <div>Loading answers</div>
            );
        }
        if(this.state.Answers.length === 7){
            return(
                <div>
                    <p>Q: {this.state.Questions[0]}</p>
                    <span>A: {this.state.Answers[0]}</span>
                    <hr />
                    <p>Q: {this.state.Questions[1]}</p>
                    <span>A: {this.state.Answers[1]}</span>
                    <hr />
                    <p>Q: {this.state.Questions[2]}</p>
                    <span>A: {this.state.Answers[2]}</span>
                    <hr />
                    <p>Q: {this.state.Questions[3]}</p>
                    <span>A: {this.state.Answers[3]}</span>
                    <hr />
                    <p>Q: {this.state.Questions[4]}</p>
                    <span>A: {this.state.Answers[4]}</span>
                    <hr />
                    <p>Q: {this.state.Questions[5]}</p>
                    <span>A: {this.state.Answers[5]}</span>
                    <hr />
                    <p>Q: {this.state.Questions[6]}</p>
                    <span>A: {this.state.Answers[6]}</span>
                    <hr />
                </div>
            );
        }
    }
}