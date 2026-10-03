# Mozé Dépannage Informatique

Site statique : `index.html` + `assets/logo.png`. Aucune installation nécessaire.

## Mise en ligne avec GitHub Pages

1. Créer un dépôt sur GitHub, par exemple `moze-depannage`.
2. Envoyer tous les fichiers de ce dossier (y compris `assets/` et `.nojekyll`) à la racine du dépôt.
3. Dépôt > Settings > Pages > Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`.
4. Après une minute, le site est en ligne sur `https://VOTRE-NOM.github.io/moze-depannage/`.
5. Domaine personnalisé (facultatif) : Settings > Pages > Custom domain.

## Recevoir les demandes automatiquement

Sans configuration, le client valide un SMS ou un e-mail pré-rédigé. Pour un envoi automatique, ouvrir `index.html`, repérer la ligne qui commence par `var KEY=` et renseigner :

- `ENDPOINT` : adresse d'un formulaire **Formspree** (formspree.io, gratuit). Créer un formulaire avec mozeinformatique@gmail.com, puis coller l'URL `https://formspree.io/f/xxxxxxxx`. Chaque demande arrive alors par e-mail.
- `HOOK` : adresse d'un webhook **Make** ou **Zapier** qui envoie un SMS au 07 82 72 82 89 (par exemple via Twilio ou un autre service d'envoi de SMS). Les champs reçus : `reference`, `message`, `nom`, `telephone`, `email`, `domaine`, `intervention`, `appareil`, `probleme`.

Ne jamais coller de mot de passe ou de clé secrète dans `index.html` : le fichier est public.

## Limites à connaître

- « Mon espace » garde les demandes dans le navigateur du client (pas de compte multi-appareils).
- Des comptes réels demandent un serveur (Firebase ou Supabase par exemple).
