window.addEventListener('DOMContentLoaded', selectViewChange, false);
window.addEventListener('hashchange', selectViewChange, false);

async function selectViewChange() {
  const isAuth = await isAuthenticate();
  if(location.hash.startsWith('#category=')) {
    showViewForPostByCategory();
  } else if(location.hash.startsWith('#post=')) {
    showViewPostSelected();
  } else if(location.hash.startsWith('#signup') && !isAuth){
    showViewSignUp();
  } else if(location.hash.startsWith('#signin') && !isAuth){
    showViewSignIn();
  } else if(location.hash.startsWith('#profile') && isAuth) {
    showViewProfile();
  } else if(location.hash.startsWith('#search=')) {
    showViewSearch();
  }else {
    showHome();
  }
}

function sectionsDisplay() {
  mainBanner.style.display = 'none';
  sectionPostsFavoritesContainer.style.display = 'none';
  sectionPostNowContainer.style.display = 'none';
  sectionCategoriesContainer.style.display = 'none';
  sectionPostSelected.style.display = 'none';
  sectionNewsCategoreis.style.display ='none';
  sectionSignIn.style.display = 'none';
  sectionSignUp.style.display = 'none';
  sectionProfile.style.display = 'none';
  formSearch.style.display = 'none';
}

function showViewForPostByCategory() {

  sectionsDisplay();
  sectionNewsCategoreis.style.display = 'block';

  const id = location.hash.split('=');
  console.log(id);
  getPostsByCategoryId(id[1]);

}

function showViewPostSelected() {
  
  sectionsDisplay();
  sectionPostSelected.style.display = 'block';

  const [_, id] = location.hash.split('=');
  showPostByCategoryId(id);
}

function showViewSignIn() {
  sectionsDisplay();
  sectionSignIn.style.display = 'flex';
}

function showViewSignUp() {
  sectionsDisplay();
  sectionSignUp.style.display = 'flex';
}

function showViewProfile() {
  insertInfoUser();
  sectionsDisplay();
  sectionProfile.style.display = 'block';
  
}

function showViewSearch() {
  mainBanner.style.display = 'none';
  sectionPostsFavoritesContainer.style.display = 'none';
  sectionPostNowContainer.style.display = 'none';
  sectionCategoriesContainer.style.display = 'none';
  sectionPostSelected.style.display = 'none';
  sectionNewsCategoreis.style.display ='block';
  sectionSignIn.style.display = 'none';
  sectionSignUp.style.display = 'none';
  sectionProfile.style.display = 'none';
  formSearch.style.display = 'block';

  let [_,search] = location.hash.split('=');
  search ||= null;
  getPostsBySearch(search);
}

function showHome() {
  mainBanner.style.display = 'block';
  sectionNewsCategoreis.style.display = 'none';
  sectionCategoriesContainer.style.display = 'block';
  sectionPostNowContainer.style.display = 'block';
  sectionPostsFavoritesContainer.style.display = 'block';
  sectionPostSelected.style.display = 'none';
  sectionSignIn.style.display = 'none';
  sectionSignUp.style.display = 'none';
  sectionProfile.style.display = 'none';
  formSearch.style.display = 'block';
}