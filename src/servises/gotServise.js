export default class gotServise {

    //разделяем фронтенд и бэконд

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    getResourse = async(url) => { //обьявл асинхронн функции 
        const res = await fetch(`${this._apiBase}${url}`); //что нужно подождать

        if (!res.ok) {
            throw new Error(`couldnt fetch ${url}. status: ${res.status}`)
        }

        return await res.json(); //что нужно подождат
    };

    getAllCharacters = async() => {
        // ждём данные из этой части кода
        //берет данные из эйпиай
        const res = await this.getResourse(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter)
            //трансформирует в необходимый вид
    }
    getCharacter = async(id) => {
        const char = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(char)
    }
    getAllHouses = async() => {
        const res = await this.getResourse(`/houses/`);
        return res.map(this._transformHouse)
    }
    getHouse = async(id) => {
        const house = await this.getResourse(`/houses/${id}`);
        return this._transformHouse(house)
    }
    getAllBooks = async() => {
        const res = await this.getResourse(`/books/`);
        return res.map(this._transformCharacter)
    }
    getBook = async(id) => {
        const book = await this.getResourse(`/books/${id}`);
        return this._transformCharacter(book)
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }
    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1]
    }

    _transformCharacter = (char) => { //берет перс с серв
        return { //на случай если апи предоставляет корявые данные
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)

        };
    }
    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        };
    }
    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released),
        }
    }
}