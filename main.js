const grid = document.querySelector('.grid')
const score_board = document.querySelector('.score')
const width = 8

const random_colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple'
]

const squares = []

let score = 0

// Create Board
function createBoard(){
    for(let i = 0; i < width * width; ++i){
        const createSquare = document.createElement('div')
        createSquare.style.backgroundColor = random_colors[Math.floor(Math.random() * 4)]
        createSquare.setAttribute('draggable', true)
        createSquare.setAttribute('id', i)
        grid.appendChild(createSquare)
        squares.push(createSquare)
    }
}

createBoard()

// Drag candy
let color_being_dragged
let color_being_replaced

let id_being_dragged
let id_being_replaced
function dragStart(){
    color_being_dragged = this.style.backgroundColor
    id_being_dragged = parseInt(this.id)
}

function dragEnd(){
    const valid_move = [
        id_being_dragged + 1,
        id_being_dragged - 1,
        id_being_dragged + width,
        id_being_dragged - width
    ]

    const isValid = valid_move.includes(id_being_replaced)

    if(id_being_replaced && isValid){
        id_being_replaced = null
    }else if(id_being_replaced && !isValid){
        squares[id_being_dragged].style.backgroundColor = color_being_dragged
        squares[id_being_replaced].style.backgroundColor = color_being_replaced
    }else{
        squares[id_being_dragged].style.backgroundColor = color_being_dragged
    }
}

function dragOver(e){
    e.preventDefault()
}

function dragEnter(e){
    e.preventDefault()
}

function dragLeave(){
    
}

function dragDrop(){
    color_being_replaced = this.style.backgroundColor
    id_being_replaced = parseInt(this.id)
    squares[id_being_dragged].style.backgroundColor = color_being_replaced
    squares[id_being_replaced].style.backgroundColor = color_being_dragged
}

squares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
})

squares.forEach(square => {
    square.addEventListener('dragend', dragEnd)
})

squares.forEach(square => {
    square.addEventListener('dragover', dragOver)
})

squares.forEach(square => {
    square.addEventListener('dragenter', dragEnter)
})

squares.forEach(square => {
    square.addEventListener('dragleave', dragLeave)
})

squares.forEach(square => {
    square.addEventListener('drop', dragDrop)
})


// Check for Match

    // Check for rows

        // check for three
        function checkRowsForThree(){
            for(let i = 0; i < 61; ++i){
                const row_for_three = [i, i+1, i+2]
                const firstColor = squares[i].style.backgroundColor
                const is_blank = squares[i].style.backgroundColor == ''
                const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
                if(notValid.includes(i)){
                    continue
                }else{
                    if(row_for_three.every(index => squares[index].style.backgroundColor == firstColor && !is_blank)){
                        row_for_three.forEach(index => {
                            squares[index].style.backgroundColor = ''
                        })

                        score += 10
                    }
                }
            }
        }

        // check for four
        function checkRowsForFour(){
            for(let i = 0; i < 60; ++i){
                const row_for_four = [i, i+1, i+2, i+3]
                const firstColor = squares[i].style.backgroundColor
                const is_blank = squares[i].style.backgroundColor == ''
                const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
                if(notValid.includes(i)){
                    continue
                }else{
                    if(row_for_four.every(index => squares[index].style.backgroundColor == firstColor && !is_blank)){
                        row_for_four.forEach(index => {
                            squares[index].style.backgroundColor = ''
                        })

                        score += 10
                    }
                }
            }
        }


    // Check for columns

        // check for three
        function checkColoumnsForThree(){
            for(let i = 0; i < 47; ++i){
                const coloumn_for_three = [i, i+width, i+width*2]
                const firstColor = squares[i].style.backgroundColor
                const is_blank = squares[i].style.backgroundColor == ''
                if(coloumn_for_three.every(index => squares[index].style.backgroundColor == firstColor && !is_blank)){
                    coloumn_for_three.forEach(index => {
                        squares[index].style.backgroundColor = ''
                    })

                    score += 10
                }
            }
        }

        // check for four
        function checkColoumnsForFour(){
            for(let i = 0; i < 39; ++i){
                const coloumn_for_four = [i, i+width, i+width*2, i+width*3]
                const firstColor = squares[i].style.backgroundColor
                const is_blank = squares[i].style.backgroundColor == ''
                if(coloumn_for_four.every(index => squares[index].style.backgroundColor == firstColor && !is_blank)){
                    coloumn_for_four.forEach(index => {
                        squares[index].style.backgroundColor = ''
                    })

                    score += 10
                }
            }
        }

// Move Down Candy
function moveDown(){
    for(let i = 0; i < 55; ++i){
        if(squares[i + width].style.backgroundColor == ''){
            squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
            squares[i].style.backgroundColor = ''

            const first_row = [0, 1, 2, 3, 4, 5, 6, 7]
            if(first_row.includes(i) && squares[i].style.backgroundColor == ''){
                const random_color = random_colors[Math.floor(Math.random() * 4)]
                squares[i].style.backgroundColor = random_color
            }
        }
    }
}

function animate(){
    // Check for rows
    checkRowsForThree()
    checkRowsForFour()

    // Check for coloumns
    checkColoumnsForThree()
    checkColoumnsForFour()

    moveDown()

    score_board.innerHTML = score
    
    requestAnimationFrame(animate)
}

animate()