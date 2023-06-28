//const URL_API = 'http://localhost:3000/api/v1/'




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
    document.cookie = 'token_session='+data.token
    location.hash = '#profile';
  } catch (error) {
    console.error(error)
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
    document.cookie = 'token_session='+data.token
    location.hash = '#profile'    

  } catch (error) {
    console.error(error);
  }
}

async function insertInfoUser() {
  try {
    const response = await fetch(URL_API+'profile');
    const data = await response.json();
    if(data.statusCode == 401) throw new Error('Unauthorized');
    
    optionsNav.style.display = 'none';
    divPerfil.style.display = 'block';
    userElement.innerHTML = data.username;
    createPosts(data.posts, profileSection);
  } catch (error) {
    location.hash = 'signin';
  }
}


async function toggleNewPost() {
  try {
    var [_,id] = location.hash.split('=');
    const response = await fetch(URL_API+'profile/add', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        post_id: id
      })
    })
    const message = await response.json();
    if(message.statusCode != 200) throw new Error(message.statusCode); 

  } catch (error) {
    if(error.message==401) return location.hash = 'signin';
    if(error.message==400) {
      const responseD = await fetch(URL_API+'profile/delete/'+id, {
        method: 'DELETE'
      });
      const messageD = await responseD.json();
      console.log(messageD);
    } 
  }
}

function logoutSesion() {
  document.cookie = "token_session=; max-age=0";
  optionsNav.style.display = 'flex';
  divPerfil.style.display = 'none';
  location.hash = 'home';
}

divPerfil.addEventListener('click', () => {
  location.hash = 'profile';
});

logOutButton.addEventListener('click', () => {
  logoutSesion();
})
