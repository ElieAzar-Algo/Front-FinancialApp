
import './App.css';
//import Register from './register/register.js';
import Login from './login/login.js';
import Home from './home/Home';
import Menu from './menu/menu';
import AddIncome from './addIncome/addIncome';
import Test from './home/Test'
import Report from './report/Report';
import ExpensesAndIncome from './expensesAndIncomes/ExpensesAndIncome';


function App() {
  return (
    <div className="App">
      <header>
        <ExpensesAndIncome/>
      </header>
    </div>
  );
}

export default App;
