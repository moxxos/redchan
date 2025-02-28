import Model from "./model/Model";
import Server from "./server/Server";

export interface Board {
    name: string
    id: string
}

export interface Category {
    name: string
    boards: Array<Board>
}

const BOARDS: Array<Category> = [
    {
        name: 'Japanese Culture',
        boards: [
            { name: 'Anime & Manga', id: 'a' },
            { name: 'Anime/Cute', id: 'c' },
            { name: 'Anime/Wallpapers', id: 'w' },
            { name: 'Mecha', id: 'm' },
            { name: 'Cosplay & EGL', id: 'cgl' },
            { name: 'Cute/Male', id: 'cm' },
            { name: 'Flash', id: 'f' },
            { name: 'Transportation', id: 'n' },
            { name: 'Otaku Culture', id: 'jp' },
            { name: 'Virtual Youtubers', id: 'vt' }
        ],
    },
    {
        name: 'Video Games',
        boards: [
            { name: 'Video Games', id: 'v' },
            { name: 'Video Games Generals', id: 'vg' },
            { name: 'Video Games/Multiplayer', id: 'vm' },
            { name: 'Video Games/Mobile', id: 'vmg' },
            { name: 'Pokemon', id: 'vp' },
            { name: 'Retro Games', id: 'vr' },
            { name: 'Video Games/RPG', id: 'vrpg' },
            { name: 'Video Games/Strategy', id: 'vst' },
        ]
    },
    {
        name: 'Interests',
        boards: [
            { name: 'Comics & Cartoons', id: 'co' },
            { name: 'Technology', id: 'g' },
            { name: 'Television & Film', id: 'tv' },
            { name: 'Weapons', id: 'k' },
            { name: 'Auto', id: 'o' },
            { name: 'Animals & Nature', id: 'an' },
            { name: 'Traditional Games', id: 'tg' },
            { name: 'Sports', id: 'sp' },
            { name: 'Extreme Sports', id: 'xs' },
            { name: 'Professional Wrestling', id: 'pw' },
            { name: 'Science & Math', id: 'sci' },
            { name: 'History', id: 'his' },
            { name: 'International', id: 'int' },
            { name: 'Outdoors', id: 'out' },
            { name: 'Tyos', id: 'toy' }
        ]
    },
    {
        name: 'Creative',
        boards: [
            { name: 'Oekaki', id: 'i' },
            { name: 'Papercraft & Origami', id: 'po' },
            { name: 'Photography', id: 'p' },
            { name: 'Food & Cooking', id: 'ck' },
            { name: 'Artwork/Critique', id: 'ic' },
            { name: 'Wallpapers/General', id: 'wg' },
            { name: 'Literature', id: 'lit' },
            { name: 'Music', id: 'mu' },
            { name: 'Fashion', id: 'fa' },
            { name: '3DCG', id: '3' },
            { name: 'Graphic Design', id: 'gd' },
            { name: 'Do-It-Yourself', id: 'diy' },
            { name: 'Worksafe GIF', id: 'wsg' },
            { name: 'Quests', id: 'qst' }
        ]
    },
    {
        name: 'Other',
        boards: [
            { name: 'Business & Finance', id: 'biz' },
            { name: 'Travel', id: 'trv' },
            { name: 'Fitness', id: 'fit' },
            { name: 'Paranormal', id: 'para' },
            { name: 'Advice', id: 'adv' },
            { name: 'LGBT', id: 'lgbt' },
            { name: 'Pony', id: 'mlp' },
            { name: 'Current News', id: 'news' },
            { name: 'Worksafe Requests', id: 'wsr' },
            { name: 'Very Important Posts', id: 'vip' }
        ]
    },
    {
        name: 'Misc. (NSFW)',
        boards: [
            { name: 'Random', id: 'b' },
            { name: 'ROBOT9001', id: 'r9k' },
            { name: 'Politically Incorrect', id: 'pol' },
            { name: 'International/Random', id: 'bant' },
            { name: 'Cams & Meetups', id: 'soc' },
            { name: 'Shit 4chan Says', id: 's4s' }
        ]
    },
    {
        name: 'Adult (NSFW)',
        boards: [
            { name: 'Sexy Beautiful Women', id: 's' },
            { name: 'Hardcore', id: 'hc' },
            { name: 'Handsome Men', id: 'hm' },
            { name: 'Hentai', id: 'h' },
            { name: 'Ecchi', id: 'e' },
            { name: 'Yuri', id: 'u' },
            { name: 'Hentai/Alternative', id: 'd' },
            { name: 'Yaoi', id: 'y' },
            { name: 'Torrents', id: 't' },
            { name: 'High Resolution', id: 'hr' },
            { name: 'Adult GIF', id: 'gif' },
            { name: 'Adult Cartoons', id: 'aco' },
            { name: 'Adult Requests', id: 'r' }
        ]
    }
]

const MAX_THREADS = 100
const POST_LIMIT = 300

export default class App {

    readonly AppModel: Model
    readonly AppServer: Server

    constructor(keys) {
        this.AppModel = new Model(MAX_THREADS, POST_LIMIT, BOARDS, keys)
        this.AppServer = new Server(this.AppModel, keys)
    }

    async initApp() {
        await this.AppModel.initModel()
    }

    start() {
        this.AppServer.start()
    }
}