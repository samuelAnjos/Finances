const Modal = { // obj
    open(){
        //abrir o modal
        //adicionar a class active ao modal
        document.querySelector('.modal-overlay')
        .classList
        .add('active')
    },
    close(){
    //fechar o Modal
    // remover a class active do modal
    document.querySelector('.modal-overlay')
    .classList
    .remove('active')
    }
}

const transactions = { //array de obj

     //When we work with money we put 2 zeros. Ex: 200 -> 20000
    all: Storage.get(),
//:[  {
//         id=1,
//         description='Luz',
//         amount: -50000, 
//         date: '23/07/2021',
//     },

//     {
//         id=2,
//         description='WebSite',
//         amount: -500000,
//         date: '23/07/2021',
//     },

//     {
//         id=3,
//         description='Internet',
//         amount: -20000,
//         date: '23/07/2021',
//     }
//   ],
}

const transaction = {

     all: transactions,

     add(transaction) {
         transaction.all.push(transaction)
     },

     remove(index){
         transaction.all.splice(index, 1)
         App.reload()
     },

     incomes(){
         let income = 0;
         //get all transaction
         //for each transactio
         transaction.all.forEach(transaction => {
             // if transection bigger zero
             if(transaction.amount > 0){
                // plus the variable and return it
                income += transaction.amount;
             }
         })
         return income;
     },
     expenses(){
       
            let expense = 0;
            //get all transaction
            //for each transactio
            transaction.all.forEach(transaction => {
                // if transection bigger zero
                if(transaction.amount < 0){
                   // plus the variable and return it
                   expense += transaction.amount;
                }
            })
            return expense;
        },
     total(){
        return transaction.incomes() + transaction.expenses();
    }
}

const DOM = {
    
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
        
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img onclick="{transaction.remove(${index})" src="./image/minus.svg" alt="Remover transação">
            </td>
        `
        return html
    },

    updateBalance(){
        document.getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(transaction.incomes())

        document.getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(transaction.expenses())

        document.getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(transaction.total())
    },

    clearTransation(){
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {

    formatDate(){
        const splittendDate = date.split("-")
        return `${splittendDate[2]}/${splittendDate[1]}/${splittendDate[0]}`
    },

    formatAmount(value){
        value = Number(value) * 100 // para tirar , , " " express regu 
        return value                   //   /\,\./g, ""
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "") //expresao regular see
        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        //console.log(signal + value)
        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),
    getValue(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
     
    validateFields(){
        const {description, amount, date} = Form.getValues()

        if(description.trim() === "" || amount.trim() === "" || date.trim()
        === ""){
            throw new Error("Por favor, preencha todos os campos")

        }
    },

    

    formatValues(){
        let { description, amount, date} = Form.getValues()
        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    saveTransection(transaction){
        transaction.add(transaction)
    },

    claerFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event){
        event.preventDefault()

        try {
            // check that all information has been filled in (preenchidas)
            Form.validateFields()
            // format data to save
            const transaction = Form.formatValues()
            // to save
            Form.saveTransection(transaction)
            // delete form data
            Form.claerFields()
            Modal.close()
            //update the application ja tem
           
        } catch (error) {
            alert(error.message)
        }

    }
}

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("finances:transactions")) || []
    },

    set(transaction){
        localStorage.setItem("finances:transactions", JSON.stringify(transactions))
    }
}

const app = {
    init(){

        transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index)
        })
        
        DOM.updateBalance()
        
        Storage.set(transactions.all)

    },
    reload(){
        clearTransation()
        App.init()
    },
}

App.init()

transaction.add({
    id: 39,
    description='oi',
    amount: 200,
    date : '3/04/2021'
})

