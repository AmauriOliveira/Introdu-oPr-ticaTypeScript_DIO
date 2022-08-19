enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

interface HttpRequest {
  url: string;
  method: HttpMethod;
  body?: any /* Conferir a tipagem */;
}

interface criarRequestToken {
  success: boolean;
  expires_at: Date;
  request_token: string;
}

interface criarSessao {
  session_id: string;
  success: boolean;
}

interface resultsSearchMovie {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface creationOfList {
  status_code: number;
  status_message: string;
  success: boolean;
  list_id: string;
}

interface movieAddedWithSuccess {
  success: true;
  status_code: 12;
  status_message: 'The item/record was updated successfully.';
}

let apiKey: string;
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId: string;

let loginButton = document.getElementById('login-button') as HTMLInputElement;
let searchButton = document.getElementById('search-button') as HTMLInputElement;
let searchContainer = document.getElementById(
  'search-container'
) as HTMLInputElement;
let newListButton = document.getElementById(
  'new-list-button'
) as HTMLInputElement;
let listContainer = document.getElementById('list-container') as HTMLDivElement;
let movieContainer = document.getElementById(
  'movie-container'
) as HTMLInputElement;

loginButton.addEventListener('click', async () => {
  await criarRequestToken();
  await logar();
  await criarSessao();
});

searchButton.addEventListener('click', async () => {
  let lista = document.getElementById('lista');
  if (lista) {
    lista.outerHTML = '';
  }
  let query = document.getElementById('search') as HTMLInputElement;
  let listaDeFilmes: resultsSearchMovie = await procurarFilme(query.value);

  let ul = document.createElement('ul');
  ul.id = 'lista';
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    let btn = document.createElement('button');
    btn.addEventListener('click', async () =>
      adicionarFilmeNaLista(item.id.toString())
    );
    btn.innerText = 'Adicionar a lista';
    li.appendChild(document.createTextNode(item.original_title));
    li.appendChild(btn);
    ul.appendChild(li);
  }
  searchContainer.appendChild(ul);
});

newListButton.addEventListener('click', async () => {
  let name = document.getElementById('new-list-name') as HTMLInputElement;
  let description = document.getElementById(
    'new-list-description'
  ) as HTMLInputElement;
  let result: creationOfList = await criarLista(name.value, description.value);
  if (!result.success) {
    alert('Erro ao criar a lista');
  }

  let div = document.createElement('div');
  let h3 = document.createElement('h3');
  h3.innerText = name.value;
  let p = document.createElement('p');
  p.innerText = description.value;
  let button = document.createElement('button');
  button.addEventListener('click', () => selectList(result.list_id));
  button.innerText = 'Selecionar lista';
  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(button);
  listContainer.appendChild(div);
});

function preencherSenha() {
  let passwordInput = document.getElementById('senha') as HTMLInputElement;
  password = passwordInput.value;
  validateLoginButton();
}

function preencherLogin() {
  let usernameInput = document.getElementById('login') as HTMLInputElement;
  username = usernameInput.value;
  validateLoginButton();
}

function preencherApi() {
  let apiKeyInput = document.getElementById('api-key') as HTMLInputElement;
  apiKey = apiKeyInput.value;

  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

class HttpClient {
  static async get<T>({ url, method, body = null }: HttpRequest): Promise<T> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText,
          });
        }
      };
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText,
        });
      };

      if (body) {
        request.setRequestHeader(
          'Content-Type',
          'application/json;charset=UTF-8'
        );
        body = JSON.stringify(body);
      }
      request.send(body);
    });
  }
}

async function procurarFilme(query: string): Promise<resultsSearchMovie> {
  query = encodeURI(query);

  let result = await HttpClient.get<resultsSearchMovie>({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: HttpMethod.GET,
  });

  return result;
}

async function adicionarFilme(filmeId: string): Promise<Movie> {
  let result: Movie = await HttpClient.get<Movie>({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: HttpMethod.GET,
  });
  return result;
}

async function criarRequestToken() {
  let result = await HttpClient.get<criarRequestToken>({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: HttpMethod.GET,
  });

  requestToken = result.request_token;
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: HttpMethod.POST,
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`,
    },
  });
}

async function criarSessao(): Promise<void> {
  let result = await HttpClient.get<criarSessao>({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: HttpMethod.GET,
  });

  sessionId = result.session_id;
}

async function criarLista(
  name: string,
  description: string
): Promise<creationOfList> {
  let result = await HttpClient.get<creationOfList>({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: HttpMethod.POST,
    body: {
      name,
      description,
      language: 'pt-br',
    },
  });

  return result;
}

async function adicionarFilmeNaLista(filmeId: string): Promise<void> {
  if (!listId) {
    alert('Primeiro crie uma nova lista.');
    return;
  }

  let result: movieAddedWithSuccess =
    await HttpClient.get<movieAddedWithSuccess>({
      /* TODO: remover a tipagem ANY */
      url: `https://api.themoviedb.org/3/list/${listId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
      method: HttpMethod.POST,
      body: {
        media_id: filmeId,
      },
    });

  if (!result.success) {
    alert('Erro ao adicionar o filme na lista');

    result;
  }

  let movie: Movie = await adicionarFilme(filmeId);
  let div = document.createElement('div');
  let h3 = document.createElement('h3');
  h3.innerText = movie.title;
  let p = document.createElement('p');
  p.innerText = movie.overview;
  div.appendChild(h3);
  div.appendChild(p);
  movieContainer.appendChild(div);
}

async function pegarLista() {
  let result: any = await HttpClient.get({
    /* TODO: remover a tipagem ANY */
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: HttpMethod.GET,
  });
  console.log(result);
}

function selectList(id: string) {
  if (listId === id) {
    alert('A lista já está selecionada');

    return;
  }
  if (movieContainer.firstElementChild !== null) {
    movieContainer.removeChild(movieContainer.firstElementChild);
  }
  listId = id;
}
