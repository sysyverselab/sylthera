function displayTabPage() {
  const settings = {
    // SELECTEURS D'ELEMENTS HTML
    selectors: {
      allPosts: ".posts-container", // Conteneur de tous les posts
      post: ".post", // Conteneur d'un post
    },
    // CLASS AJOUTEES PAR LE SCRIPT
    classes: {
      tab: "page-tab", // Ajoutée au conteneur de posts pour définir l'affichage des onglets
      tabOptions: "page-tab-options", // Class du conteneur d'options
      clear: "clear", // Ajouté à .post-container pour masquer les bouton d'édition
      active: "active", // Ajouté au bouton d'onglet actif et au post actif
    },
    // AFFICHAGE DES OPTIONS
    options: {
      insetBefore: ".posts-container", // Sélecteur de l'élément avant lequel insérer les options
      editButtonsLabel: "Cacher les boutons d'édition", // Texte de l'option 1
      toggleTabLabel: "Désactiver l'affichage des onglets", // Texte de l'option 2
    },
  };


  const advancedSettings = {
    tabAttribut: "onglet",
    get tabButton() {
      return `button[${this.tabAttribut}]`;
    },
  };


  const isPageTab = document.querySelector(`${settings.selectors.post}:has(${advancedSettings.tabButton})`) !== null;
  if (!isPageTab && _userdata["user_level"] === 1) {
    console.info("[PAGE ONGLET] Cette page ne contient pas d'onglets.");
    return;
  } else if (!isPageTab) {
    return;
  }


  const container = document.querySelector(settings.selectors.allPosts);
  if (!container) {
    console.error(`[PAGE ONGLET] Erreur : Impossible de trouver l'élément .${settings.selectors.allPosts}`);
    return;
  }


  const posts = document.querySelectorAll(settings.selectors.post);
  if (posts.length === 0) {
    console.error(`[PAGE ONGLET] Erreur : Aucun élément .${settings.selectors.post} trouvé`);
    return;
  }


  if (_userdata["user_level"] === 1) {
    // Ajout des inputs avant .container
    const containerParent = container.parentElement;
    const inputsWrapper = document.createElement("div");
    inputsWrapper.classList.add(settings.classes.tabOptions);
    inputsWrapper.innerHTML = `
      <label>
          <input type="checkbox" id="toggleEditButtons" checked> ${settings.options.editButtonsLabel}
      </label>
      <br/>
      <label>
          <input type="checkbox" id="toggleTabs"> ${settings.options.toggleTabLabel}
      </label>
    `;
    containerParent.insertBefore(inputsWrapper, container);


    // Gestion des checkboxes
    const toggleEditButtons = document.getElementById("toggleEditButtons");
    const toggleTabs = document.getElementById("toggleTabs");


    toggleEditButtons.addEventListener("change", function () {
      container.classList.toggle(settings.classes.clear, this.checked);
    });


    toggleTabs.addEventListener("change", function () {
      const isChecked = this.checked;
      container.classList.toggle(settings.classes.tab, !isChecked);
      container.classList.toggle(settings.classes.clear, !isChecked);
      toggleEditButtons.disabled = isChecked;
      if (!isChecked) toggleEditButtons.checked = true;
    });
  }


  // Ajout des classes par défaut
  container.classList.add(settings.classes.tab, settings.classes.clear);


  const buttons = document.querySelectorAll(advancedSettings.tabButton);


  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabName = this.getAttribute(advancedSettings.tabAttribut);


      // Supprime la classe active de tous les posts
      posts.forEach((post) => {
        post.classList.remove(settings.classes.active);
      });


      // Supprime la classe active de tous les boutons
      buttons.forEach((btn) => btn.classList.remove(settings.classes.active));


      // Ajoute la classe active au post correspondant
      const targetPost = document.querySelector(`${settings.selectors.post}:has(div[${advancedSettings.tabAttribut}='${tabName}'])`);
      if (!targetPost) {
        console.error(`[PAGE ONGLET] Erreur : Impossible de trouver l'élément post avec l'ID ${tabName}`);
      } else {
        targetPost.closest(settings.selectors.post).classList.add(settings.classes.active);
        // Ajoute la classe active au bouton cliqué
        this.classList.add(settings.classes.active);
      }
    });
  });


  // Active par défaut le post correspondant au bouton actif
  const activeButton = document.querySelector(`${advancedSettings.tabButton}.${settings.classes.active}`);
  if (!activeButton) {
    console.error(
      `[PAGE ONGLET] Aucun onglet actif trouvé. Ajoutez la class .${settings.classes.active} à un bouton pour afficher un post par défaut.`
    );
  } else {
    const defaultTabName = activeButton.getAttribute(advancedSettings.tabAttribut);
    const defaultPost = document.querySelector(`${settings.selectors.post}:has(div[${advancedSettings.tabAttribut}="${defaultTabName}"])`);
    if (defaultPost) {
      defaultPost.classList.add(settings.classes.active);
    }
  }
}
