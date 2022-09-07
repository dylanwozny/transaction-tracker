
//  add transaction to table 
// event click (prevent default) 
// retrieve information from fields 
//  Validate information in fields (use div.error) 
//   make sure drop down list type is chosen
//		only positive number
//		- currency should be displayed with dollar sign and two decimal places
// -	use numObj.toFixed(2) to round decimal answers
// - create dom object elements to store in table
// - reset fields once the submit button is pressed
// - add a total tracker variable to add up transactions total for debit and credit
// - add a delete button(use code from previous assignment)
//		- must have a 'are you sure prompt'
// - add in timer that counts down and refreshs page using alert window for prompt

const transactionBody = document.querySelector('tbody');
let totalDebits = 0;
let totalCredits = 0;

// -------onclick event listener--------
document.querySelector('.frm-transactions').addEventListener('submit', (evt) => {
  // -----grab values from fields------
  let transactionDescription = evt.target.elements.description.value;
  let transactionType = evt.target.elements.type.value;
  let transactionMonies = evt.target.elements.currency.value;

  // -----Validation--------
  let passValidation = 1;
  // error text
  let innerErrorText = '';

  if (transactionType === '') {
    passValidation = 0;
    innerErrorText += ' --Please select debit or credit ';
  }

  if (transactionMonies <= 0) {
    passValidation = 0;
    innerErrorText += ' --Please select a Value greater than zero and not negative ';
  }

  // -----Create Error with DOM-----------
  // replace original element with new
  const error1 = document.createElement('div');
  error1.classList = 'error';
  const error1Content = document.createTextNode(innerErrorText);
  error1.appendChild(error1Content);
  const error2 = document.querySelector('.error');
  const errorParent = error2.parentNode;
  errorParent.replaceChild(error1, error2);

  if (passValidation === 1) {
    // add to table !
    // create elements
    const tr = document.createElement('tr');
    const tdDescription = document.createElement('td');
    const tdType = document.createElement('td');
    const tdAmount = document.createElement('td');
    const tdTools = document.createElement('td');
    const trashI = document.createElement('i');

    // create text Node
    const descriptionNode = document.createTextNode(transactionDescription);
    const amountNode = document.createTextNode(`$ ${transactionMonies}`);
    const typeNode = document.createTextNode(transactionType);

    // put text node into elements
    tdDescription.appendChild(descriptionNode);
    tdType.appendChild(typeNode);
    tdAmount.appendChild(amountNode);

    // add in attributes
    tr.setAttribute('class', transactionType);
    tdAmount.setAttribute('class', 'amount');
    tdTools.setAttribute('class', 'td-tools tools');
    trashI.setAttribute('class', 'delete fa fa-trash-o');

    // build document fragment
    tr.appendChild(tdDescription);
    tr.appendChild(tdType);
    tr.appendChild(tdAmount);
    tdTools.appendChild(trashI);
    tr.appendChild(tdTools);

    // Append table to document body
    transactionBody.appendChild(tr);
    evt.target.reset();

    if (transactionType === 'debit') {
	  totalDebits = parseFloat(transactionMonies) + totalDebits;
	  
      // replace original element with new
      const debit1 = document.createElement('span');
      debit1.classList = 'total debits';
      const debit1Content = document.createTextNode(`$ ${totalDebits}`);
      debit1.appendChild(debit1Content);
      const debit2 = document.querySelector('.debits');
      const debitParent = debit2.parentNode;
      debitParent.replaceChild(debit1, debit2);
    }

    if (transactionType === 'credit') {
	  totalCredits = parseFloat(transactionMonies) + totalCredits;
	  
      // replace original element with new
      const credit1 = document.createElement('span');
      credit1.classList = 'total credits';
      const credit1Content = document.createTextNode(`$ ${totalCredits}`);
      credit1.appendChild(credit1Content);
      const credit2 = document.querySelector('.credits');
      const creditParent = credit2.parentNode;
      creditParent.replaceChild(credit1, credit2);
    }
  }
  evt.preventDefault();
});

// remove list item
document.querySelector('tbody').addEventListener('click', (evt) => {

  // grab parent elements
  const targetDiv = evt.target.parentNode;
  const targetRow = targetDiv.parentNode;
  const transactionBody = targetRow.parentNode;

  if (evt.target.classList.contains('delete')) {
    if (window.confirm('Are you sure you want to delete this item ?')) {
      transactionBody.removeChild(targetRow);
    }
    if (targetRow.className === 'debit') {
      let rowAmount = targetRow.querySelector('.amount').textContent;
      rowAmount = rowAmount.replace('$', '');
      totalDebits -= parseFloat(rowAmount);

      // put new value into total
      // replace original element with new
      const debit1 = document.createElement('span');
      debit1.classList = 'total debits';
      const debit1Content = document.createTextNode(`$ ${totalDebits.toFixed(2)}`);
      debit1.appendChild(debit1Content);
      const debit2 = document.querySelector('.debits');
      const debitParent = debit2.parentNode;
      debitParent.replaceChild(debit1, debit2);
    }
    if (targetRow.className === 'credit') {
      let rowAmount = targetRow.querySelector('.amount').textContent;
      rowAmount = rowAmount.replace('$', '');
      totalCredits -= parseFloat(rowAmount);

      // put new value into total
      // replace original element with new
      const credit1 = document.createElement('span');
      credit1.classList = 'total credits';
      const credit1Content = document.createTextNode(`$ ${totalCredits.toFixed(2)}`);
      credit1.appendChild(credit1Content);
      const credit2 = document.querySelector('.credits');
      const creditParent = credit2.parentNode;
      creditParent.replaceChild(credit1, credit2);
    }
  }
});

// timer for refresh
let count = 0;
let scheduled = null;
window.addEventListener('mousemove', (evt) => {
  if (!scheduled) {
    setTimeout(() => {
      count = 0;
      scheduled = null;
    }, 750);
  }
  scheduled = evt;
});

// count interval
const timeCount = setInterval(() => {
  count++;
  if (count === 120) {
    window.alert('You have been in-active for 2 mins. The page will refresh now');
    location.reload(true);
  }
}, 1000);


