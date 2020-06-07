
// vamos usar o javascript para inserir os dados de estado na 
//lista de estado do form, buscando os dados json do site do ibge
// https://servicodados.ibge.gov.br/api/v1/localidades/estados
//criação da função:
function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch ('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( (res) => {return res.json()})
    .then( states => {

        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">"${state.nome}"</option>`
        }
    })
}

//declara e aí chama:
populateUFs()

// declaracao de arrow function, uma funcao anonima ainda menor:
// ( () => {})

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then(res=>res.json())
    .then( cities => {
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        // porém está desabilitado, uma vez que entra tem que habilitar
        citySelect.disabled = false
    })
}
// a função getCities vai ser passada por referência dentro 
// do event listener, sem os (), para ser executada na ocorrência do
// evento, ou seja, quando alguém seleciona um estado, é executada
// e, esse evento pode ser passado como parâmetro da função
document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)


// ITENS DE COLETA -----------------------
// pegar todos os lis

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

// let é sinonimo de var, pra declarar, essa var é pra funcionalidade abaixo
let SelectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // add or remove class with js
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    // pegou os ids, mas nao fez nada com isso ainda para entregar a informação
    // ao backend, precisa registrar para enviar
    // entao criamos no html um input hidden no final dos 6 itens
    // que quando clicamos vai adicionar nele e quando clicamos de novo retira:
    
    // se ja estiver selecionado e clicado, tira da seleção (toggle)
    // se nao estiver adicionar à seleção
    // atualizar o campo escondido com os itens selecionados, lá no html
    
    const alreadySelected = SelectedItems.findIndex( item => {
        const itemFound = item == itemId // itemFound vai guardar true ou false
        return itemFound})
        //vai guardar um verdadeiro 
    
        if(alreadySelected >= 0) {
            // tirar da seleção
            const filteredItems = SelectedItems.filter( item => {
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })
            SelectedItems = filteredItems
        } else {
            //se não estiver selecionado adiciona à seleção
            SelectedItems.push(itemId)
        }

        // agora atualiza o campo escondido
        collectedItems.value = SelectedItems
        console.log(SelectedItems)
}

