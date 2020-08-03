import React, { Component } from 'react';
import './css/App.css';
import { addition, subtraction, multiplication, division } from './js/operations.js';

const Btn = (props) => {
  return <button onClick={props.callback}>{props.value}</button>;
}

class App extends Component {
    constructor() {
        super();
        this.state = {equal: "",num1 : "", num2: "", action: "",isNum1: false, isEqual: false, isDot: false};
    }
    setNumber = e => {
        if(this.state.isEqual) {
            let num = e.target.textContent;
            this.clear();
            this.setState({
                num1: num,
                isEqual: !this.state.isEqual
            });
            return;
        }
        if(!this.state.action)
        {
                if(e.target.textContent !== '.' || this.state.isDot !== true)
                {
                    this.setState({
                        num1: this.state.num1+e.target.textContent
                    });
                }
                if(e.target.textContent === '.')
                {
                    this.setState({
                        isDot: true
                    })
                }
        }
        else {
            if(e.target.textContent !== '.' || this.state.isDot !== true)
            {
                this.setState({
                    num2: this.state.num2+e.target.textContent
                });
            }
            if(e.target.textContent === '.')
            {
                this.setState({
                    isDot: true
                })
            }
        }

    }
    setAction = e => {
        let action = e.target.textContent;
        if(action !== '=' && action !== 'C' && this.state.isEqual && action !== '-/')
        {
            let num1 = this.state.equal;
            this.clear();
            this.setState({
                num1,
                action,
                isNum1: !this.state.isNum1,
                isEqual: !this.state.isEqual
            });
        }
        if(action) {
            this.setState({
                isDot: false
            });
        }
        switch (action) {
            case '=':
                this.equal();
                break;
            case 'C':
                this.clear();
                break;
            case '-/':
                this.changeSign(this.state.num1)(this.state.num2);
                break;
            default: {
                this.setState({
                    action
                });
            }
        }
    }
    clear = () => {
        this.setState({
            equal: "",
            num1 : "",
            num2: "",
            action: "",
            isNum1: false,
            isDot: false
        });
    }
    equal = () => {
        let equal;
        switch (this.state.action) {
            case '+':
                equal = addition(this.state.num1)(this.state.num2);
                break;
            case '-':
                equal = subtraction(this.state.num1)(this.state.num2);
                break;
            case '*':
                equal = multiplication(this.state.num1)(this.state.num2);
                break;
            case '/':
                equal = division(this.state.num1)(this.state.num2);
                break;
            default:
                console.log('err');
        }
        if(isNaN(equal) || !isFinite(equal))
        {
            this.setState({
                equal: "Error", isEqual: !this.state.isEqual
            });
        }
        else {
            this.setState({
                equal: parseFloat(equal).toFixed(2), isEqual: !this.state.isEqual
            });
        }
    }
    changeSign = a => b => b === "" ? this.setState({ num1: -a }) : this.setState({ num2: -b });

    render() {
        let btns1 = [];
        let btns2 = [];
        let operationsMark = ['+','-','*','/','C','='];
        for(let i=0;i<=9;i++) {
            btns1.push(<Btn value={i} callback={this.setNumber} key={i} />);
        }
        btns1.push(<Btn value={"."} callback={this.setNumber} key={10} />);
        btns1.push(<Btn value={"-/"} callback={this.setAction} key={11} />);
        operationsMark.forEach( (mark,index) => {
          btns2.push(<Btn value={mark} callback={this.setAction} key={btns1.length+index+1} />);
        });

        return(
            <div className="calculator">
                <div className="bar">
                </div>
                <div className="view">{this.state.num1} {this.state.action} {this.state.num2} = {this.state.equal}</div>
                <div className="flex">
                    <div className="numbers">
                        {btns1}
                    </div>
                    <div className="operations">
                        {btns2}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
