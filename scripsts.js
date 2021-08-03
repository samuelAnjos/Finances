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

const transactions = [ //array de obj

     //When we work with money we put 2 zeros. Ex: 200 -> 20000
    {
        id=1,
        description='Luz',
        amount: -50000, 
        date: '23/07/2021',
    },

    {
        id=2,
        description='WebSite',
        amount: -500000,
        date: '23/07/2021',
    },

    {
        id=3,
        description='Internet',
        amount: -20000,
        date: '23/07/2021',
    },
]

const transaction = {
     incomes(){
         //somar as entradas
     },
     expenses(){
         //somar as saidas
     },
     total(){
         
    }
}

const DOM = {
    
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
        
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img src="./image/minus.svg" alt="Remover transação">
            </td>
        `
        return html
    }
}

const Utils = {
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

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})