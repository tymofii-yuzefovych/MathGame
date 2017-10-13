import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';
import '../css/style.css';

document.addEventListener('DOMContentLoaded', function() {

    class MathAnswersGame extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                wynik: "",
                pointer: 0,
                stan: false,
                stanGame: true,
                gameOver: false,
                timeToStartStan: false,
                timeToStart: 5
            }
        }

        /* get number entered by the player with the input*/
        handleNameChange = (event) => {
            const cos1 = event.target.value;
            this.setState({wynik: cos1});
        };

        /* function creates two random numbers and adds to state*/
        randomNumbers = () => {
            const number1 = Math.floor(Math.random() * (10 - 1) + 1);
            const number2 = Math.floor(Math.random() * (10 - 1) + 1);
            const sum = number1 + number2;

            this.setState({num1: number1, num2: number2, counter: 3, disabled: "", sum: sum})

        };

        /*  In function call function randomNumbers and turns on interval and so on, check replies player and start function newGame or game over */
        newGame = () => {
            this.randomNumbers();
            this.intervalId = setInterval(() => {
                this.setState({
                    counter: this.state.counter - 1
                }, () => {
                    this.nameInput.focus();
                    if (this.state.counter === 0 && this.state.sum == this.state.wynik) {
                        this.setState({
                            pointer: this.state.pointer + 1,
                            wynik: ""
                        });
                        this.randomNumbers();
                    } else if (this.state.counter === 0 && this.state.sum !== this.state.wynik) {
                        clearInterval(this.intervalId);
                        this.setState({disabled: "disabled", stan: false, gameOver: true, stanGame: true});
                    }
                })
            }, 1000);
        };

        /*  change states and enables interval to start game*/
        handleNewGameButtonClick = () => {
                this.setState({timeToStartStan: true, gameOver: false, timeToStart: 5, stanGame: false, pointer:0, wynik:""});
                this.idInterval = setInterval(() => {
                    this.setState({
                        timeToStart: this.state.timeToStart - 1
                    }, () => {
                        if (this.state.timeToStart === 0) {
                            clearInterval(this.idInterval);
                            this.setState({stan: true, timeToStartStan: false});
                            this.newGame();
                        }
                    })
                }, 1000)
            };

        componentWillUnmount() {
            clearInterval(this.intervalId);
        }

        render() {
            return (
                <div className={"game"}>
                    <div className={'start'} style={{
                        display: this.state.stanGame === false ? "none" : "block"}}>
                        <button onClick={this.handleNewGameButtonClick}>New Game</button>
                    </div>
                    <div className={'timeToStart'} style={{
                        display: this.state.timeToStartStan === false ? "none" : "block"}}>
                        <h2>Time to Start</h2><br/>
                        <span>{this.state.timeToStart}</span>
                    </div>
                    <div style={{
                        display: this.state.stan === false ? "none" : "block"
                    }} className={'game'}>
                        <h1>{this.state.num1}
                            &nbsp;+ {this.state.num2}
                            &nbsp; = &nbsp;{this.state.wynik}
                        </h1>
                        <div>
                            <input ref={(input) => {
                                this.nameInput = input;
                            }} placeholder="Your answer" disabled={this.state.disabled} type="number" value={this.state.wynik} onChange={this.handleNameChange}/>
                        </div>
                        <h2>00:0{this.state.counter}</h2>
                        <h3>Score:&nbsp;{this.state.pointer}</h3>
                    </div>
                    <div style={{
                        display: this.state.gameOver === false ? "none" : "block"
                    }} className={"gameOver"}>
                        <h1>Game Over&nbsp;!</h1>
                        <h2>Your score :&nbsp;{this.state.pointer}</h2>
                    </div>
                </div>
            )
        }
    }

    class Template extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <div id="main">
                    <div className='header clearfix'>
                        <div className='icon'>
                            <a href="#"></a>
                            <a href="#"></a>
                            <a href="#"></a>
                        </div>
                        <div className="name">MathGame</div>
                    </div>
                    <div className='wrap'>
                        <MathAnswersGame/>
                    </div>
                </div>
            )
        }
    }

    class NotFound extends React.Component {
        render() {
            return <h1>404, Nothing is here</h1>;
        }
    }

    class App extends React.Component {
         render() {
            return <Router history={hashHistory}>
                <Route path='/' component={Template}/>
                <Route path='*' component={NotFound}/>
            </Router>
        }
    }
    ReactDOM.render(
        <App/>, document.getElementById('app'));
});
