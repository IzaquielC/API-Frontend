import axios from 'axios';


export default class App {
    constructor() {
        this.offset = 0;
        this.apikey = '07f05d67192c439bf8203269fc153fdd';
        this.hash = 'a2110823d4049282bfbe666bd8e79fff';
        this.ts = '1609890812920';
        this.characterId = '1011334';
        this.comicId = '22506';
    }

    getCharacters() {
        axios.get('http://localhost:4444/')
        .then(response => {
            this.populate(response.data)
            this.setPagination(response.data)
        })
        .catch(erro => console.log(erro))
    }

    getCharacters() {
        
        const url = `https://gateway.marvel.com/v1/public/characters?apikey=${this.apikey}&hash=${this.hash}&ts=${this.ts}&limit=100&offset=${this.offset}`;
    
        axios.get(url)
        .then(response => {
            this.populate(response.data.data.results);
            this.setPagination(response.data.data.total);
        })    
        .catch(error => console.log(error));
    }

    getCharacter(characterId) {
        const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${this.apikey}&hash=${this.hash}&ts=${this.ts}&limit=100&offset=${this.offset}`;

        
    }

    getCharacter(comicId) {
 
        const url = `http://gateway.marvel.com/v1/public/comics/${comicId}?apikey=${this.apikey}&hash=${this.hash}&ts=${this.ts}&limit=100&offset=${this.offset}`;
        

    }

    populate(data) {
    
        document.querySelector('.table tbody').innerHTML = '';
    
        data.forEach(item => {
            const tr = `<div class="image">
                            <td><img class="caracters" src="${item.thumbnail.path}.${item.thumbnail.extension}"></td>
                        </div>`;
    
            document.querySelector('.table tbody').innerHTML += tr;    
        });
        
    };

    setPagination(totalItems) {
        const pages = Math.ceil(totalItems / 100);
    
        document.querySelector('.pagination').innerHTML = '';
    
        for (let i = 1; i <= pages; i++) {
            const li = `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            document.querySelector('.pagination').innerHTML += li;
    
            for (let link of document.getElementsByClassName('page-link')) {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    
                    const page = event.target.dataset.page;
                    this.offset = (parseInt(page) - 1) * 100;
                    this.getCharacters();
                })
            }
        }
    }
}