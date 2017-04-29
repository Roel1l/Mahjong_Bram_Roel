export class Tile{
    
    _id: string;
    xPos: number;
    yPos: number;
    suit: string;
    name: string;
    matchesWholeSuit: boolean;
    match: {
        foundBy: string;
        otherTyleId: string;
        foundOn: string;
    }

}