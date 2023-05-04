const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    image: battleBackgroundImage
})


let draggle
let emby
let renderedSprites
let battleAnimationId
let queue
let dragglesDefeated = 0

function initBattle() {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()

    draggle = new Monster(monsters.Draggle)
    emby = new Monster(monsters.Emby)
    renderedSprites = [draggle, emby]
    queue = []

    emby.attacks.forEach((attack) => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attacksBox').append(button)
    })

    // our event listeners for our buttons (attack)
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        emby.attack({
            attack: selectedAttack,
            recipient: draggle,
            renderedSprites
        })

        if (draggle.health <= 0) {
            queue.push(() => {
                dragglesDefeated++
                draggle.faint()
                document.querySelector('#dragglesDefeated').innerHTML = dragglesDefeated + '/5'
            })
            queue.push(() => {
                endBattleAnimation()
                // win
                if (dragglesDefeated === 5) {
                    audio.victoryLoopWin.play()
                    document.querySelector('#gameArea').style.width = '1024px'
                    document.querySelector('#gameArea').style.height = '715px'
                    document.querySelector('#gameArea').style.backgroundColor = 'green'
                    document.querySelector('#gameArea').style.paddingTop = '30px'
                    document.querySelector('#gameArea').style.margin = '0 auto'
                    document.querySelector('#gameArea').style.alignText = 'center'
                    document.querySelector('#gameArea').style.fontSize = '16px'
                    document.querySelector('#gameArea').innerHTML = 'You saved the town! Thanks for playing!'
                }
            })
        }
        // draggle or enemy attacks right here
        const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

        queue.push(() => {
            draggle.attack({
                attack: randomAttack,
                recipient: emby,
                renderedSprites
            })

            if (emby.health <= 0) {
                queue.push(() => {
                    emby.faint()
                })

                queue.push(() => {
                    endBattleAnimation()
                })
            }
        })
    })
    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector('#attackType').innerHTML = selectedAttack.type
        document.querySelector('#attackType').style.color = selectedAttack.color
    })
})
}

function endBattleAnimation() {
    // fade back to black when monster is defeated
    gsap.to('#overlappingDiv', {
        opacity: 1,
        onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            animate()

            document.querySelector('#userInterface').style.display = 'none'
            gsap.to('#overlappingDiv', {
                opacity: 0
            })

            battle.initiated = false
            audio.map.play()
        }
    })
}

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}

animate()
// for testing battle animations and screen
//initBattle()
//animateBattle()


document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if(queue.length > 0) {
        queue[0]()
        queue.shift()
    }
    else e.currentTarget.style.display = 'none'
})

