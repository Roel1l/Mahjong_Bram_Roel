export class Game {

    _id: string;
    startedOn: string;
    minPlayers: number;
    maxPlayers: number;
    createdOn: string;
    endedOn: string;
    state: string;
    gameTemplate: string;  // Reference to gameTemplate model using its id  //TODO population?

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

