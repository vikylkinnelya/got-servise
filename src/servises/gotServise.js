class GotServise {

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

    getAllCharacters() {
        return this.getResourse(`/characters?page=5&pageSize=10`);

    }

    getCharacter(id) {
        return this.getResourse(`/characters/${id}`);
    }

}
const got = new GotServise;
got.getAllCharacters()
    .then(res => {
        res.forEach(el => console.log(el.name))
    })