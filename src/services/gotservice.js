
export default class gotService {
    constructor() {
        this.baseApi = "https://www.anapioficeandfire.com/api"
    }
   async getResource(url) {
        const res = await fetch(`${this.baseApi}${url}`)
        if(!res.ok) {
            throw new Error(`Could not fetch : ${this.baseApi}${url}, received ${res.status}`)
        }

        return res.json()
    }
    getAllCharacters = async () => {
        const char = await this.getResource(`/characters?page=5&pageSize=10`)
        return  char.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const char = await this.getResource(`/characters/${id}`)
        return this._transformCharacter(char)
    }
    getAllHouses = async () => {
        const house = await this.getResource(`/houses?page=5&pageSize=10`)
        return  house.map(this._transformHouse)
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`)
        return this._transformHouse(house)
    }
    getAllBooks = async () => {
        const book = await this.getResource(`/books?page=0&pageSize=10`)
        return  book.map(this._transformBook)

    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`)
        return this._transformBook(book)
    }
    _transformCharacter = (char) => {
        const {name, gender, born, died, culture, url} = char
        return {name: name||'Not said',
                gender: gender||'Not said',
                born: born||'Not said',
                died: died||'Not said',
                culture: culture||'Not said',
                id: +url.match(/(?<=\/)\d*$/)
                }
    }

    _transformHouse = (house) => {
        const {name, region, words, overlord, ancestralWeapons, url} = house
        return {name: name||'Not said',
                region: region||'Not said',
                words: words||'Not said',
                overlord: overlord||'Not said',
                ancestralWeapons: ancestralWeapons||'Not said',
                id: +url.match(/(?<=\/)\d*$/)
                }
    }
    _transformBook = (book) => {
        const {name, numberOfPages, publisher, released, url} = book
        return {name: name||'Not said',
                numberOfPages: numberOfPages||'Not said',
                publisher: publisher||'Not said',
                released: released||'Not said',
                id: url.match(/(?<=\/)\d*$/)[0]
                }
    }

}
