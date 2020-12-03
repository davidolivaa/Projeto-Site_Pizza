let modalQt = 1 // quantidade de pizzaas iniciais
let cart = [] //carrinho
let modalkey = 0

//comando para reduzir e organizar o codigo
const c = (el) => { 
    return document.querySelector(el)
}
const cs = (el) => document.querySelectorAll(el)

// listagem das pizzas
pizzaJson.map((item, index) => { // o metodo map mapea e roda a funçao dada como parametro em cada um dos elementos, no caso o array pizzaJson e recebe uma funçao anonima cujos parameros sao os itens do array e o index/indice
    //console.log(item)     //imprimi todos os itens, logo o array inteiro
    let pizzaItem = c('.models .pizza-item').cloneNode(true) //clona o codigo selecionado, no caso o modelo do layolt que sera exibido, ou seja, a var ganha todas as tags e class que estavam nesse bloco de codigos do html, para isso recebe duas opçoes de parmetros, se for true clona tudo e for false clona apneas as tags mais externas/pai, insere numa var

    pizzaItem.setAttribute('data-key', index) // em cada tag a com class .pizzaItem criasse um atributo data-key e esse recebe o index do array json, funciona como umm identificador para cada pizzaItem que possui cada uma das pizzas
    pizzaItem.querySelector('.pizza-item--img img').src=item.img // seleciona a div pela sua class, depois a tag img dentro e com .src seleciona a src da tag img, pra entao atribuir o valor da key img do array item 
    pizzaItem.querySelector('.pizza-item--name').innerHTML=item.name // seleciona em pizzaItem uma area e escreve com innerHTML o item.name, que é o parametro recebido na funçao inicial
    pizzaItem.querySelector('.pizza-item--desc').innerHTML=item.description //coloca o valor da key description do array item na div selecionada
    pizzaItem.querySelector('.pizza-item--price').innerHTML=`R$ ${item.price.toFixed(2)}` // metodo toFixed pra acrescentar os centavos
    pizzaItem.querySelector('a').addEventListener('click', (e) => { //adiciona um evento e no metodo os parametros sao o evento que acontecera e a funçao que sera processada quando o evento for realizado
        e.preventDefault() // impede o evento(e) padrao, que era carregar a pagina quando se clicava na tag a ou o que tem dentro dela
        let key = e.target.closest('.pizza-item').getAttribute('data-key') // target seleciona o proprio elemento(nessse caso a tag a) e com closest acha o elemento mais proximo com identificaçao igual a enviada no parametro, entao a chave key que foi inserida em cada div das pizzas é selecionada e atribuida a var key, ou seja, a var key recebera o numero exato de qual pizza foi escolhida no clique
        //console.log(pizzaJson[key])
        modalQt = 1 // quantidade de pizzas volta pra 1 sempre que se clicar em alguma, é um reset, a nao ser que seja enviada pro carrinho a informaçao com o numero de pizzas
        modalkey = key //sera o identificador de qual pizza foi escolhida, foi necessario criar outra var porque key so esta disponivel durante os eventos de clique

        c('.pizzaBig img').src = pizzaJson[key].img //quando clicar em uma pizza, a pizzaWindowArea aparece e para receber os dados da pizza correta se identificou cada div que continha uma pizza com o key
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name // cada div recebera atraves desses comandos que atribui a informaçao especifica de pizzaJson[] pelo seu index que é acessado pela key, ou seja, a key que esta na div clicada vai ser enviada pra pizzaJson[]
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        c('.pizzaInfo--actualPrice').innerHTML= `R$ ${pizzaJson[key].price.toFixed(2)}`
        c('.pizzaInfo--size.selected').classList.remove('selected') // remove a marcaçao da pizza 
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => { // size e sizeIndex sao respectivamente o proprio item selecionado(div com class) e um index feito pra esse metodo 
            if (sizeIndex == 2) {
                size.classList.add('selected')
            } // acessa a tag que tem o sizeIndex == 2 e adiciona o selected, ou seja a pizza grande sera selecionada sempre, é uma especie de reset
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex] 
        }) // seleciona a tag span dentro da div e coloca pra cada pizza especifica seu tamanho atraves do sizes[sizeIndex] que seleciona os pega os tamanhos no array dentro do array json
        
        c('.pizzaInfo--qt').innerHTML = modalQt // reescreve o numero de pizzas como 1, ja que a var recebe 1 sempre que uma pizza é clicada

        c('.pizzaWindowArea').style.opacity = 0
        c('.pizzaWindowArea').style.display = 'flex' // muda o display do css(que esta none), fazendo que volte a aparecer o conteudo do bloco selecionado
        setTimeout(() => { // funçao anonima como primeiro parametro
            c('.pizzaWindowArea').style.opacity = 1
        }, 500) // com setTimeout e dentro outra mudança na opacidade,criasse uma espcie de animaçao, o conteudo da tag a levara um tmepo pra ser exibido
    })

    c('.pizza-area').append(pizzaItem) //append insere cada um dos elementos/tags do parametro(no caso pizzaItem) na area selecionada pelo querySelector, esse comando que adiciona todas as fotos das pizzas
    //diferente do innerText que substitui/reesceve
}) 

// eventos modal
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0 // faz com que o modal fique com opacidade 0 porem ele ainda esta na tela, por isso nao é possivel clicar em outras pizzas
    setTimeout (() => {
    c('.pizzaWindowArea').style.display = 'none'    
    }, 500) // so sera quando o display for alterado pra none
}
cs ('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => { // seleciona todas as divs com essa class, entao pra cada uma roda a funçao que adiciona um evento de click nessas divs(mesmo sem input nem button) e como segundo parametro recebe a chamada da funçao
    item.addEventListener('click', closeModal)
})
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt>1) { 
        modalQt-- 
        c('.pizzaInfo--qt').innerHTML = modalQt
    } // cada vez que clicar no botao de + ou - pizzas a var modalQt atualizara o valor e esse sera mostrado pelo innerHTML
})
c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++
    c('.pizzaInfo--qt').innerHTML = modalQt
}) 
cs('.pizzaInfo--size').forEach((size, sizeIndex) => { 
    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    }) // selecionou os botoes que representam o tamanho da pizza e inseriu o evento click e a funçao que sera proocessada, no caso remover a class selected de qualquer pizza que esteja marcada para marcar a que foi clicada
})
c('.pizzaInfo--addButton').addEventListener('click', () => {
    //console.log('pizza '+modalkey)
    let size =  parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'))//seleciona com o getAttribute o data-key da tag com a pizza selecionada, ou seja, a var recebe o string que foi convertido em numero que identifica o tamanho da pizza
    let identifier = pizzaJson[modalkey].id+'-'+size // cria uma var que identifica cada pedido    
    //console.log('tamanho '+size)
    //console.log('quanidade '+modalQt)
    let key = cart.findIndex((item) => { // varre cada elemento do array e verifica se o identificador ja existe e retorna -1 se nao achar, e o index se achar
        return item.identifier == identifier
    }) 
    if (key > -1) { // se o index for retornado entao ja existe esse identificador no array, logo essa pizza ja foi pedida e basta acrescentar mais ou menos quantidades
        cart[key].qt += modalQt
    } else { // a funçao retornou -1 entao naoo existe o identificador do pedido, logo outro pedido/objeto pe inserido no carrinho/array cart 
         cart.push({ //insere as informaçoes no carrinho
        identifier, 
        id: pizzaJson[modalkey].id, // id da pizzapra saber qual foi selecionada
        size: size, // tamanho da pizza
        qt: modalQt // quantidade
    })
    }  
    updateCart() // atualiza o carrinho
    closeModal() 
    //console.log(cart)
})

c('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        c('aside').style.left = '0'
    } // faz o cart aparecer quando a tela for menor/celulares
})
c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '180vw'
})

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length

    if (cart.length > 0) { 
        c('aside').classList.add('show') // adiciona a class show na tag aside, essa mostra o carrinho na tela se ele tiver itens
        c('.cart').innerHTML = '' // esvazia o cart para que as pizzas que ja foram escolhidas nao sejam exibidas de novo na tela quando o usuario selecionar outras

        let subtotal = 0
        let desconto = 0
        let total = 0

        for (let i in cart) {
           let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id) // verifica/mapea cada indice do cart/array e se o id do item que esta no json for igual ao id que esta no cart, entao podemos pegar todos os detalhes dessa pizza ja que sao a mesma, e as informaçoes sao todas colocadas na var pizzaItem como um objeto
           //console.log(pizzaItem)
           subtotal += pizzaItem.price*cart[i].qt

           let cartItem = c('.models .cart--item').cloneNode(true) // seleciona o codigo e clona para deois inserir nele as informaçoes das pizzas 
           let pizzaSizeName; // var criada pra identificar os tamanhos de pizzas por çetras em vez de numeros/sua data-key
           switch (cart[i].size) {
               case 0:
                   pizzaSizeName = 'P'
                   break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;               
           }
           let pizzaName =  `${pizzaItem.name} (${pizzaSizeName})`
           // o nome da pizza sera imprimido com o nome tirado do objeto e com uma letra que representa o tamanho atraves da outra var
           cartItem.querySelector('img').src = pizzaItem.img // acrscenta a img no clone cartItem
           cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
           cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt 
           cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
               if (cart[i].qt > 1) {
                   cart[i].qt--
               } else {
                   cart.splice(i, 1) // splice remove do array o elemento de indice indicado e quantos elementos forem enviados como parametro, ou seja, o array com varios objetos(cada com um indice pois cada um é um elemento do array) pode ter um ou mais removidos se a qt(que é uma key dos elementos do objeto do indice determinado) desses chegar a zero 
               }
               updateCart()
           })
           cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
               cart[i].qt++
               updateCart()
           })

           c('.cart').append(cartItem) // insere na div com class 'cart' o clone cartItem com todas os detalhes 
        } // modo reduzido da funçao sem o return
        desconto = subtotal*0.1
        total = subtotal - desconto

        c('.subtotal span:last-child').innerHTML=`R$ ${subtotal.toFixed(2)}` //template strings        
        c('.desconto span:last-child').innerHTML=`R$ ${desconto.toFixed(2)}`        
        c('.total span:last-child').innerHTML=`R$ ${total.toFixed(2)}`  

    } else {
        c('aside').classList.remove('show')
        c('aside').style.left = '100vw'
    }
}