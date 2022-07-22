const modal = document.querySelector('.modal')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#name')
const sFuncao = document.querySelector('#employee')
const sSalario = document.querySelector('#salary')
const btnSalvar = document.querySelector('#btnSalvar')
const btnIncluir = document.querySelector('#registerClient')
const fecharModal = document.querySelector('#modalClose')

let itens;
let id;

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

btnIncluir.addEventListener('click', () => {
    openModal();
})

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
      insertItem(item, index)
    })
}
  
loadItens();

function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.funcao}</td>
      <td>R$ ${item.salario}</td>
      <td class="action">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="action">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
  }

  function editItem(index) {

    openModal(true, index)
  }
  
  function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
  }

  function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    fecharModal.addEventListener('click', () => {
        modal.classList.remove('active')
    }) 
  
    if (edit) {
      sNome.value = itens[index].nome
      sFuncao.value = itens[index].funcao
      sSalario.value = itens[index].salario
      id = index
    } else {
      sNome.value = ''
      sFuncao.value = ''
      sSalario.value = ''
    }
    
  }

  btnSalvar.addEventListener('click', (e) => { 
    e.preventDefault();

    if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
        return
      }
  
    if (id !== undefined) {
      itens[id].nome = sNome.value
      itens[id].funcao = sFuncao.value
      itens[id].salario = sSalario.value
    } else {
      itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
    }
  
    setItensBD()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
  })
  