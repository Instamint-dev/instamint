import {BaseSeeder} from "@adonisjs/lucid/seeders";
import Commentary from "#models/commentary";

export default class extends BaseSeeder {

     async run () {
        await Commentary.createMany(([
        {
            id_minter: 1,
            id_nft: 1,
            message: 'This is a commentary 1 ',
            id_parent_commentary: 0,
            date: '2021-12-12'
        },
        {
            id_minter: 2,
            id_nft: 1,
            message: 'This is a commentary 2',
            id_parent_commentary: 0,
            date: '2021-12-12'
        },
        {
            id_minter: 3,
            id_nft: 1,
            message: 'This is a commentary 3',
            id_parent_commentary: 0,
            date: '2021-12-12'
        },
        {
            id_minter: 4,
            id_nft: 1,
            message: 'This is a commentary 3',
            id_parent_commentary: 0,
            date: '2021-12-12'
        },
    ]))
    }
}
