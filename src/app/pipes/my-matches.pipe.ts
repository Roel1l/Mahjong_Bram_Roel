import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { Tile } from "app/models/tile";
import { UserService } from "app/services/user.service";
import { UserDependendComponent } from "app/core/UserDependend.base";

@Pipe({ name: 'myMatches' })
export class MyMatchesPipe extends UserDependendComponent implements PipeTransform, OnInit {

    filteredMatches: Tile[];

    constructor(userService: UserService) {
        super(userService);
        super.ngOnInit();
    }

    transform(allMatches: Tile[], input: number) {
        var self = this;
        self.filteredMatches = new Array<Tile>();
      
        switch (input) {
            case 0:
                self.filteredMatches = allMatches;
                break;
            case 1:
                for (var match of allMatches) {
                    if (match.match.foundBy == self.user._id) {
                        self.filteredMatches.push(match);
                    }
                }
                break;
            case 2:
                for (var match of allMatches) {
                    if (match.match.foundBy != self.user._id) {
                        self.filteredMatches.push(match);
                    }
                }
        }
        return self.filteredMatches;
    }

}