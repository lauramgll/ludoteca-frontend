import { Client } from "../../client/model/Client";
import { Game } from "../../game/model/Game";

export class Loan {
    id: number;
    game: Game;
    client: Client;
    startDate: Date;
    endDate: Date;
}