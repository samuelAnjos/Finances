const Modal = {
    open(){
        //abrir o modal
        //adicionar a class active ao modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
    //fechar o Modal
    // remover a class active do modal
    document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const transactions = [
    {
        id=1,
        description='Luz',
        amount: -50000,
        date: '23/07/2021'
    },
    {
        id=2,
        description='WebSite',
        amount: -500000,
        date: '23/07/2021'
    },
    {
        id=3,
        description='Internet',
        amount: -20000,
        date: '23/07/2021'
    }
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
    innerHTMLTransaction(){

        const html = `
        
        <tr>
            <td class="description">Luz</td>
            <td class="expense">- R$ 500,00</td>
            <td class="date">23/07/2021</td>
             <td>
            <img src="./image/minus.svg" alt="Remover transação">
            </td>
        </tr>
        `
    }
}