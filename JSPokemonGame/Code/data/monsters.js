const monsters = {
    Emby: {
        position: {
            x: 280,
            y: 325
        },
        image: {
            src: './img/embySprite.png'
        },
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        health: 100,
        name: 'Emby',
        attacks: [attacks.Tackle, attacks.Fireball],
        weakness: 'Grass'
    },
    Draggle: {
        position: {
            x: 800,
            y: 100
        },
        image: {
            src: './img/draggleSprite.png'
        },
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        isEnemy: true,
        health: 100,
        name: 'Draggle',
        attacks: [attacks.Tackle, attacks.Fireball],
        weakness: 'Fire'
    }
}