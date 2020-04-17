/* eslint-disable no-eval */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const endsWithOperators = /[-/*+]$/;
const endsWithDoubleSign = /[/*+]-$/;
const endsWithDecimal = /.$/

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            currentNum: "0",
            equation: "",
            evaluated: false
        }
    }

    handleClick = buttonName => {
        let currentNum = this.state.currentNum;
        let equation = this.state.equation;
        let evaluated = this.state.evaluated;
        

        switch(true) {
            case buttonName === "0" :
                    if(equation.length >= 15) {
                        currentNum = "Maximum Digits!"
                        setTimeout(() => this.setState({ currentNum: this.state.equation }), 1000);
                    }else if(evaluated){
                        equation = buttonName;
                        currentNum = buttonName;
                    }else if(endsWithOperators.test(equation)){
                        equation += buttonName
                        currentNum = buttonName
                    }else if(endsWithDecimal.test(equation)){
                        equation += buttonName
                        currentNum += buttonName
                    }
                    else {
                        currentNum += buttonName;
                        equation += buttonName
                    }  
            break;
            case buttonName === "1" ||
                 buttonName === "2" ||
                 buttonName === "3" ||
                 buttonName === "4" ||
                 buttonName === "5" ||
                 buttonName === "6" ||
                 buttonName === "7" ||
                 buttonName === "8" ||
                 buttonName === "9" :
                 if(currentNum === "0" || endsWithOperators.test(currentNum) === true){
                    currentNum = currentNum.slice(0, currentNum.length - 1)
                }
                 if(equation.length >= 15) {
                        currentNum = "Maximum Digits!"
                        setTimeout(() => this.setState({ currentNum: this.state.equation }), 1000);
                    }else if(evaluated){
                        equation = buttonName;
                        currentNum = buttonName;
                        evaluated = false; // after equal sign everything is clear
                   
                   }else {
                        equation += buttonName
                        currentNum += buttonName;
                   }
            break;
            case buttonName === "+" ||
                 buttonName === "*" ||
                 buttonName === "/" :
                    if(endsWithDoubleSign.test(equation)){
                        equation = equation.slice(0, equation.length - 2)
                        currentNum = buttonName
                    }
                    if(endsWithOperators.test(equation)){
                        equation = equation.slice(0, equation.length - 1)
                        currentNum = buttonName
                     }
                     if(equation.length >= 15) {
                        currentNum = "Maximum Digits!"
                        setTimeout(() => this.setState({ currentNum: this.state.equation }), 1000);
                     }else if(evaluated){
                        equation = currentNum + buttonName;
                        currentNum = buttonName;
                        evaluated = false; 
                    }else {
                        equation += buttonName
                        currentNum = buttonName
                    }
                    
            break;
            case buttonName === "-":
                    if(endsWithDoubleSign.test(equation)){
                        equation = equation.slice(0, equation.length - 2)
                        currentNum = buttonName
                    }
                    if(equation.length >= 15) {
                        currentNum = "Maximum Digits!"
                        setTimeout(() => this.setState({ currentNum: this.state.equation }), 1000);
                    }else if(evaluated){
                        equation = currentNum + buttonName;
                        currentNum = buttonName;
                        evaluated = false; 
                    }else {
                        equation += buttonName
                        currentNum = buttonName
                }
            break;
            case buttonName === "." :
                if(equation.length >= 15) {
                    currentNum = "Maximum Digits!"
                    setTimeout(() => this.setState({ currentNum: this.state.equation }), 1000);
                }else if(evaluated){
                    equation = "0"
                    currentNum = "0"
                }else if(endsWithOperators.test(equation)){
                    equation += "0"
                    currentNum = "0"
                }else if(this.state.currentNum === "0" || equation === ""){
                    equation = "0."
                    currentNum = "0."
                }
                if (!currentNum.includes(".")) {
                        equation += buttonName
                        currentNum += buttonName;
                        evaluated = false
                    }
            break;
            case buttonName === "DEL":
                if(equation.length > 1){
                const delNum = equation.slice(0, equation.length - 1);
                equation = delNum;
                currentNum = delNum;
            } else {
                equation = ""
                currentNum = "0"
            }
            break;
            case buttonName === "AC" :
                equation = "";
                currentNum= "0";
            break;
            case buttonName === "=" :
                if (endsWithOperators.test(equation)){
                currentNum = this.state.currentNum
                }if(equation.length >= 15) {
                    const answer = Math.round(1000000000000 * eval(equation)) / 1000000000000
                    equation = answer
                    currentNum = answer
                    evaluated = true
                }else {
                    const answer = Math.round(1000000000000 * eval(equation)) / 1000000000000
                    equation = equation + buttonName + answer
                    currentNum = answer
                    evaluated = true
               }
            break;
            default :
            currentNum = "0"

        }
        this.setState({currentNum});
        this.setState({equation});
        this.setState({evaluated});
    }
       
render() {
   
    return (
        <div id="container">
            <div id="calculator">
                <div id="Screen">
                    <UpperDisplay equation={this.state.equation}/>
                    <LowerDisplay currentNum={this.state.currentNum} />
                </div>
                <div id="keypads">
                    <div className="row">
                        <Keypad id="clear" value="AC" handleClick={this.handleClick}/>
                        <Keypad id="delete" value="DEL" handleClick={this.handleClick}/>
                    </div>
                    <div className="row">
                        <Keypad id="seven" value="7" handleClick={this.handleClick}/>
                        <Keypad id="eight" value="8" handleClick={this.handleClick}/>
                        <Keypad id="nine" value="9" handleClick={this.handleClick}/>
                        <Keypad id="divide" value="/" handleClick={this.handleClick}/>
                    </div>
                    <div className="row">
                        <Keypad id="four" value="4" handleClick={this.handleClick}/>
                        <Keypad id="five" value="5" handleClick={this.handleClick}/>
                        <Keypad id="six" value="6" handleClick={this.handleClick}/>
                        <Keypad id="multiply" value="*" handleClick={this.handleClick}/>
                    </div>
                    <div className="row">
                        <Keypad id="one" value="1" handleClick={this.handleClick}/>
                        <Keypad id="two" value="2" handleClick={this.handleClick}/>
                        <Keypad id="three" value="3" handleClick={this.handleClick}/>
                        <Keypad id="subtract" value="-" handleClick={this.handleClick}/>
                    </div>
                    <div className="row">
                        <Keypad id="decimal" value="." handleClick={this.handleClick}/>
                        <Keypad id="zero" value="0" handleClick={this.handleClick}/>
                        <Keypad id="equals" value="=" handleClick={this.handleClick}/>
                        <Keypad id="add" value="+" handleClick={this.handleClick}/> 
                    </div>  
                </div>
            </div>

        </div>
        
    )
}        
}

class Keypad extends React.Component {
    
    displayValue = () => {
        this.props.handleClick(this.props.value)
    }
   
    render() {
        return(
        <button id={this.props.id} onClick={this.displayValue}>{this.props.value}</button>  
        )
    }
}

class UpperDisplay extends React.Component {
    render() {
        return(
        <div id="equationScreen">{this.props.equation}</div>
        )
    }
}

class LowerDisplay extends React.Component {
    render() {
        return(
        <div id="display">{this.props.currentNum}</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));