'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Function to display the transactions
const displayMovements = movements => {
  //clear the initial dummy data
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
    const transcType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
                   <div class="movements__type movements__type--${transcType}">${
      i + 1
    } ${transcType}</div>
                   <div class="movements__date">3 days ago</div>
                   <div class="movements__value">${mov} €</div>
                 </div>`;

    //add each movements row to movements div
    // element.insertAdjacentHTML(position, text);
    /* 'beforebegin': Before the element itself.
'afterbegin': Just inside the element, before its first child.-> just after the elem tag starts
'beforeend': Just inside the element, after its last child.
'afterend': After the element itself. */
    //to add the new movement above the prev one
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/* --------------------------- COMPUTING USERNAME --------------------------- 
create a userName prop for each account in the accounts array by taking the 1st letter of each owner name
*/

const computeUserName = accs => {
  accs.forEach(acc => {
    acc.userName = acc.owner // "sara smith"
      .toLowerCase()
      .split(' ') //["sara","smith"]
      .map(user => user[0]) //["s", "s"]
      .join(''); //"ss"
  });
};

computeUserName(accounts); //side effect of for each - mutates the array
console.log(accounts);

/* ---------------------------- CALCULATE BALANCE &DISPLAY--------------------------- */

const showBalance = acc => {
  const moves = [...acc.movements];
  const bal = moves.reduce((accu, mov) => accu + mov, 0); // 0 is initial value; accu = 0+mov -> returned
  console.log(bal);
  labelBalance.textContent = `${bal} €`;
};

showBalance(account1);

/* ---------------------------- CALCULATE SUMMARY (in/out/interest) --------------------------- */
//for chainging dont over use it ; avoid mutating array methods , for heavy arrays chaining slows down
const calcDisplaySummary = movements => {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const debit = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(debit)} €`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(depo => (depo * 1.2) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
};

calcDisplaySummary(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
