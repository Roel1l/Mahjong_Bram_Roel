export class Tile{
    
    _id: string;
    xPos: number;
    yPos: number;
    zPos: number;
    tile: {
        _id: number,
        id: number,
        suit: string;
        name: string;
        matchesWholeSuit: boolean;
    }
    match: {
        foundBy: string;
        otherTyleId: string;
        foundOn: string;
    }

}