const URL_API = 'http://localhost:3000/api/v1/'


const cookie = document.cookie;
console.log('cookie', cookie);
(function() {
  if(cookie.includes('token_session=')){
    console.log('yes')
    optionsNav.style.display = 'none';
    divPerfil.style.display = 'block';
  } else {
    console.log('no');
    divPerfil.style.display = 'none';
    optionsNav.style.display = 'flex';
  }
  console.log(cookie);
})();

const createPosts = (data, section) => {
  const elementsHTML = [];
  section.innerHTML = '';
  data.forEach(element => {
    const container = document.createElement('div');
    container.className = 'post';
    //container.dataset.id = element.id;
    const img = document.createElement('img');
    img.setAttribute('src', 'https://img.freepik.com/vector-gratis/fondo-minimalista-dibujado-mano_23-2148997841.jpg');
    const containerInfo = document.createElement('div');
    containerInfo.className = 'post_info';
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    h4.textContent = element.title;
    p.textContent = element.content;
    
    containerInfo.appendChild(h4);
    containerInfo.appendChild(p);
    container.appendChild(img);
    container.append(containerInfo);

    container.addEventListener('click', () => {
      location.hash = 'post='+element.id;
    })

    elementsHTML.push(container);
  });

  section.append(...elementsHTML);
}

const createPostsV = (data, section) => {
  const elementsHTML = [];
  data.forEach(e => {
    const {labels} = e;
    const article = document.createElement('article');
    const divPost = document.createElement('div');
    const divPostlabels = document.createElement('div');
    const divLabels = document.createElement('div');
    const h4 = document.createElement('h4');
    const pInfo = document.createElement('p');
    const pCategory = document.createElement('p');
    article.className = 'news-category__post';
    divPost.className = 'post__info';
    divPostlabels.className = 'post__info-labels';
    divLabels.className = 'labels-container';
    pCategory.className = 'post__info-category';

    h4.textContent = e.title;
    pInfo.textContent = e.content;
    pCategory.textContent = e.name_category;

    labels.forEach(x => {
      const pLabel = document.createElement('p');
      pLabel.textContent = x.name_label;
      divLabels.appendChild(pLabel);
    });

    divPost.appendChild(h4);
    divPost.appendChild(pInfo);
    divPostlabels.appendChild(pCategory);
    divPostlabels.appendChild(divLabels);
    article.appendChild(divPost);
    article.appendChild(divPostlabels);

    article.addEventListener('click', () => {
      location.hash = 'post='+e.id;
    })

    elementsHTML.push(article);
  })

  section.append(...elementsHTML);
}

async function getPostsMoreVoted() {
  const response = await fetch(URL_API+'posts/favorites');
  const data = await response.json();
  createPosts(data, sectionPostsFavorites);
}

async function getAllPosts() {
  const response = await fetch(URL_API+'posts');
  const data = await response.json();
  createPosts(data, sectionPostNow);
}

async function getAllCategories() {
  const list = [];
  const response = await fetch(URL_API+'categories');
  const data = await response.json();

  data.forEach(e => {
    const p = document.createElement('p');
    p.textContent = e.name_category;
    p.addEventListener('click', () => {
      location.hash='#category='+e.id;
    })
    list.push(p);
  })
  sectionCategories.append(...list);
}

async function getPostsByCategoryId(id) {
  const response = await fetch(URL_API+`posts/category/${id}`);
  const data = await response.json();
  newsCategories.innerHTML = '';

  createPostsV(data, newsCategories);

}

async function showPostByCategoryId(id) {
  const response = await fetch(`${URL_API}posts/${id}`);
  const data = await response.json();
  const {labels} = data[0];
  const fecha = new Date(data[0].created_at).toLocaleDateString();
  const HTML = `
  <div class="header__background">
  <div class="post-selected__header width-all">
    <h3>
      ${data[0].title}
    </h3>
    <div class="post-selected__meta">
      <div class="meta__avatar">
        <img src="https://api.realworld.io/images/demo-avatar.png" alt="">
        <div>
          <h5>${data[0].writer.name}</h5>
          <p>Posted on ${fecha}</p>
        </div>
      </div>

      <div class="meta__favorites">
        <i class="fa-solid fa-heart"></i> Likes (${data[0].likes})
      </div>

      <div class="meta__save" onclick="toggleNewPost()">
        <i class="fa-sharp fa-regular fa-bookmark" title="añadir a favoritos"></i>
      </div>
    </div>
    <div class="post-selected__labels">

    </div>
  </div>
</div>

<section class="post-selected__info width-all">
  ${data[0].content}
</section>
  `
  sectionPostSelected.innerHTML = HTML;
  const containerLabels = document.querySelector('.post-selected__labels');
  labels.forEach(e => containerLabels.innerHTML+=`
  <div class="label">
        <i class="fa-regular fa-hashtag"></i>${e.name_label}
  </div>
  `);

  await fetch(URL_API+'posts/view/'+id, {method:'PATCH'});
}

async function getPostsBySearch(search) {
  try {
    const response = await fetch(URL_API+'posts/search/'+search);
    const posts = await response.json();
    newsCategories.innerHTML = '';
    createPostsV(posts, newsCategories);
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}

formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(formSearch);
  location.hash = 'search='+data.get('search');
})

getPostsMoreVoted();
getAllPosts();
getAllCategories()