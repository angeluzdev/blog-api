formSignin.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(formSignin);
  const user = {
    email: data.get('email'),
    password: data.get('password')
  }
  console.log(user);
  authenticateUser(user);
})

formSignup.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(formSignup);
  const newUser = {
    email: data.get('email'),
    password: data.get('password'),
    username: data.get('username')
  }
  console.log(newUser);
  registerUser(newUser);
})

const viewSignin = () => {
  location.hash = 'signin';
}
const viewSignup = () => {
  location.hash = 'signup';
}

async function authenticateUser(user) {
  try {
    const response = await fetch(URL_API+'auth/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...user
      })
    })

    const data = await response.json();
    console.log(data);

    if(data.error) throw new Error(data.message);

    document.cookie = 'token_session='+data.token
    location.hash = '#profile';
  } catch (error) {
    console.error(error);
    messageIn.innerHTML = error.message;
  }
}

async function registerUser(user) {
  try {
    const response = await fetch(URL_API+'auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(user)
    })

    const data = await response.json();
    console.log(data);

    if(data.error) throw new Error(data.message);

    document.cookie = 'token_session='+data.token
    location.hash = '#profile'    

  } catch (error) {
    console.error(error.message);
    messageUp.innerHTML = error.message;
  }
}

async function insertInfoUser() {
  try {
    iconHeart.id = ''
    iconFav.id = 'icon-fav'
    const [_, token] = document.cookie.split('=');
    const response = await fetch(URL_API+'profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log(data);
    if(data.statusCode == 401) throw new Error('Unauthorized');
    
    optionsNav.style.display = 'none';
    divPerfil.style.display = 'block';
    userElement.innerHTML = data.username;
    createPosts(data.posts, profileSection);
  } catch (error) {
    location.hash = 'signin';
  }
}

async function insertLikePosts() {
  try {
    iconHeart.id = 'icon-heart'
    iconFav.id = ''
    const [_, token] = document.cookie.split('=');
    const response = await fetch(URL_API+'profile/likes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json();

    if(data.statusCode == 401) throw new Error('Unauthorized');
    console.log(data);
    createPosts(data, profileSection);
  } catch (error) {
    console.log(error);
    console.log('llega?', error.message)
    location.hash = 'signin'
  }
}

async function toggleNewPost() {
  try {
    var [_,id] = location.hash.split('=');
    var [a,token] = document.cookie.split('=');
    const response = await fetch(URL_API+'profile/add', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post_id: id
      })
    })
    const message = await response.json();
    console.log('messageAdd',message)
    if(message.message != 'success') throw new Error(message.statusCode);
    console.log('si añadio')
    document.querySelector('.meta__save').classList.toggle('select-fav')
  } catch (error) {
    if(error.message==401) return location.hash = 'signin';
    if(error.message==400) {
      const responseD = await fetch(URL_API+'profile/delete/'+id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const messageD = await responseD.json();
      document.querySelector('.meta__save').classList.toggle('select-fav')
      console.log(messageD);
    } 
  }
}

async function toggleLikePost() {
  const [_, id] = location.hash.split('=');
  const [a, token] = document.cookie.split('=');
  try {
    const response = await fetch(URL_API+'profile/like/add/'+id, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json();
    console.log(data);
    if(data.message != 'success') throw new Error(data.statusCode);
    document.querySelector('.meta__favorites').classList.toggle('select-like')
  } catch (error) {
    console.log(error.message);
    if(error.message == 400) {
      console.log('llegue')
      const responseD = await fetch(URL_API+'profile/like/delete/'+id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await responseD.json();
      document.querySelector('.meta__favorites').classList.toggle('select-like')
      console.log(data);
    }
  }
}

async function isAuthenticate() {
  const [_, token] = document.cookie.split('=');
  const response = await fetch(URL_API+'auth', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  console.log(data);
  localStorage.setItem('userState', JSON.stringify(data));
  return data.isAuth
}

function logoutSesion() {
  document.cookie = "token_session=; max-age=0";
  
  location.href = '/';
}

divPerfil.addEventListener('click', () => {
  location.hash = 'profile';
});

logOutButton.addEventListener('click', () => {
  logoutSesion();
})
