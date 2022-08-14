import { HttpMethod, HttpRequest } from './utils';
let apiKey: string;
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId = '7101979'; /* WFT */

let loginButton = document.getElementById('login-button') as HTMLInputElement;
let searchButton = document.getElementById('search-button') as HTMLInputElement;
let searchContainer = document.getElementById(
  'search-container'
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
  let listaDeFilmes: any = await procurarFilme(
    query.value
  ); /*TODO: REMOVER Tipagem */
  console.log('listaDeFilmes', listaDeFilmes);

  let ul = document.createElement('ul');
  ul.id = 'lista';
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title));
    ul.appendChild(li);
  }
  console.log(listaDeFilmes);
  searchContainer.appendChild(ul);
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
  static async get({ url, method, body = null }: HttpRequest) {
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

async function procurarFilme(query: string) {
  query = encodeURI(query);
  console.log(query);
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: HttpMethod.GET,
  });
  return result;
}

async function adicionarFilme(filmeId: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: HttpMethod.GET,
  });
  console.log(result);
}

async function criarRequestToken() {
  let result: any = await HttpClient.get({
    /* TODO: remover tipagem ANY */
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: HttpMethod.GET,
  });

  console.log('criarRequestToken', result);

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

async function criarSessao() {
  let result: any = await HttpClient.get({
    /* TODO: remover a tipagem ANY */
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: HttpMethod.GET,
  });
  sessionId = result.session_id;
}

async function criarLista(name: string, description: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: HttpMethod.POST,
    body: {
      name,
      description,
      language: 'pt-br',
    },
  });
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId: string, listaId: string) {
  let result: any = await HttpClient.get({
    /* TODO: remover a tipagem ANY */
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: HttpMethod.POST,
    body: {
      media_id: filmeId,
    },
  });
  console.log(result);
}

async function pegarLista() {
  let result: any = await HttpClient.get({
    /* TODO: remover a tipagem ANY */
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: HttpMethod.GET,
  });
  console.log(result);
}
