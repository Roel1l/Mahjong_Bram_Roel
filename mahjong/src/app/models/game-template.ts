export class GameTemplate {
    
    _id: template;
    
    tiles : 
        [{
            xPos: number,
            yPos: number,
            zPos: number
        }] 
}

enum template{
    Dragon,
    Monkey,
    Ox,
    Ram,
    Rooster,
    Shanghai,
    Snake
}