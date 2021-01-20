export default class GotServise {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    async getResourse(url) { //обьявл асинхронн функции 
        const res = await fetch(`${this._apiBase}${url}`); //что нужно подождать

        if (!res.ok) {
            throw new Error(`couldnt fetch ${url}. status: ${res.status}`)
        }

        return await res.json(); //что нужно подождат
    };

    async getAllCharacters() {
        // ждём данные из этой части кода
        //берет данные из эйпиай
        const res = await this.getResourse(`/characters/`);
        return res.map(this._transformCharacter)
            //трансформирует в необходимый вид
    }
    async getCharacter(id) {
        const char = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(char)
    }
    async getAllHouses() {
        const res = await this.getResourse(`/houses/`);
        return res.map(this._transformHouse)
    }
    async getHouse(id) {
        const house = await this.getResourse(`/houses/${id}`);
        return this._transformHouse(house)

    }
    async getAllBooks() {
        const res = await this.getResourse(`/books/`);
        return res.map(this._transformCharacter)
    }
    async getBook(id) {
        const book = await this.getResourse(`/books/${id}`);
        return this._transformCharacter(book)

    }
    _transformCharacter(char) { //берет перс с серв
        return { //на случай если апи предоставляет корявые данные
            name: char.name,
            gender: char.gender,
            born: char.born || 'there is no data',
            died: char.died || 'there is no data',
            culture: char.culture || 'there is no data'
        }
    }
    _transformHouse(house) {
        return {
            name: house.name || 'there is no data',
            region: house.region || 'there is no data',
            words: house.words || 'there is no data',
            titles: house.titles || 'there is no data',
            overlord: house.overlord || 'there is no data',
            ancestralWeapons: house.ancestralWeapons || 'there is no data'
        }
    }
    _transformBook(book) {
        return {
            name: book.name || 'there is no data',
            numberOfPages: book.numberOfPages || 'there is no data',
            publisher: book.publisher || 'there is no data',
            released: book.released || 'there is no data'
        }
    }
}