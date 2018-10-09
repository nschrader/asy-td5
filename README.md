# ASY : TD5

TD5 du cours d'Architecture des Systèmes Informatique et de l'Information.

L'objectif de ce TD est de manipuler des données comme "dans la vrai vie", en m'inspirant de situations réellement rencontrées dans mon travail. On va voir aussi l'architecture que l'on peut mettre en place pour cela.

Le ministère de l'enseignement supérieur et de la recherche a lancé *le chantier compétences*. Officiellement pour permettre une meilleure lecture de l'offre de formation et pour mieux qualifier les compétences des étudiants. Officieusement, c'est une action pour surcharger les enseignants, enseignant-chercheurs et l'administration des établissements d'enseignement supérieur.

Mais l'INSA possède une cellule secrète qui agit dans ce genre de cas et vous en faites parti ! Vous devez agir.

## Installation de node

Si ça n'est pas fait, voir le TD1 : https://github.com/dreimert/dia-td1

## Protocole

L'INSA a déjà un catalogue de formations que l'on peut trouver à l'adresse https://www.insa-lyon.fr/fr/formation/diplomes/ING. Cette page liste les formations de l'INSA puis via un lien pour chaque formation, on accède à la liste des UEs de celle-ci. Pour chaque UE, un *pdf* détaillant la formation.

L'objectif est d'extraire du site et des pdfs les informations de chaque UE et de constituer une base de données.

## Implémentation

Cloner ce dépot :

    git clone https://github.com/dreimert/asy-td5.git

Installation des dépendances :

    npm install

### Tika

Tika est une solution qui permet, entre autre, de convertir un pdf en texte.

## Test

Vos yeux. Regardez si les données stockées correspondent à ce qui est indiqué dans le pdf.

## Par où commencer ?

* Il y a des exemples de code dans `index.js`.
* Commencer par télécharger un pdf.
* Transformez ce pdf en texte via Tika.
* Analysez le texte pour en extraire les informations voulues. Les [RegExp](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/RegExp) sont votre amie.
* Télécharger et analyser une page de formation.
* Extraire toutes les UEs d'une formation.
* Extraire toutes les UEs de l'INSA.

## Ce que je dois retenir

Le scrapping permet d'extraire des données même sans accès à la base de données. Avec les bonnes technologies de traitement, il est possible de faire en quelques minutes ce qu'un humain mettrait des heures ou jours à faire.

## Pour aller plus loin

Extraire plus d'informations comme les pré-requis, les compétences listées... Quelques exemples : https://github.com/sfrenot/competence.
