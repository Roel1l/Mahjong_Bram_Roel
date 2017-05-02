export class Game {

    /*
        Todo: set game other attributes, get id from api after creating the game
    */
    constructor(minPlayers: number, maxPlayers: number, gameTemplate: string){
        this.minPlayers = minPlayers;
        this.maxPlayers = maxPlayers;
        this.gameTemplate = {_id: gameTemplate, id: gameTemplate}
    }


    _id: string;
    startedOn: string;
    minPlayers: number; //min 1
    maxPlayers: number; //max 32
    createdOn: string;
    endedOn: string;
    state: string;
    gameTemplate:
    {
        _id: string;
        id: string;
    }
    

    players:
    [
        {
            username: string
        }
    ]
    
    createdBy: {
        _id: string,
        name: string
    }
}

