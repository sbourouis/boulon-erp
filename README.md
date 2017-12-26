Consulter l'application : http://erp-boulons.surge.sh  
API disponible ici : https://github.com/sbourouis/boulon-erp-api  

# Pré-requis  

Installer npm, node et @angular/cli.  

Installer node : [Node 8 et npm](https://nodejs.org/en/)  
Installer @angular/cli : `npm install -g @angular/cli`  

# Lancement de l'application  

Lancez `npm run erp:frontend` à partir de la racine.  
Accédez à l'application à partir d'un navigateur : http://localhost:4200  

# Réponses aux questions  

Le langage utilisé est : Typescript avec le framework Angular 4  
  
1. 1. Pour tenir les délais, il est nécessaire d'avoir des commandes en cours d'arrivage. En effet, la première commande doit être reçue le 1 octobre 1969 sans quoi la commande n'est pas réalisable.  
     Il faut commander 10 jours ouvrés avant de réceptionner la commande. Il faut donc commander à partir du 17/09/1969 à la première heure travaillée et ensuite toutes les 6 heures travaillées.   
     ( Malheureusement notre ERP ne nous donne pas le même résultat, nous pensons que ça vient du fait qu'une machine peut travailler sur plusieurs tâches en même temps. Pour les différentes questions,  
       nous avons avancé la date du jour au 01/09/1969 afin d'avoir un résultat à afficher.)   
2. Non les dates de livraisons demandées par le client ne sont pas réalisables. En effet, il faudrait avoir des commandes en cous d'arrivages comme il est posible de le voir à la question précédente.  
Il est toutefois possible de proposer au client de livrer les commandes en plusieurs fois. Les 15 000 boulons ne seront probablement pas utilisés en une journée.  
  
3. Contrat 1 (les dates de commandes n'étant pas les mêmes dans l'ERP, un résultat différent sera affiché) :   
      1000 € le cout horaire, 12h pour fabriquer 1000 boulons, le contrat 1 comporte 90 000 boulons = 12 * 90 * 1 000 = 1 080 000 €  
      12 commandes passée en Septembre * (10000/1.02) = 117 647.06  
      + 27 commandes en Octobre * 10000 = 27 000  
      + 23 commandes en Novembre * 10000 * 1.02 = 234 600  
      + 27 commandes en décembre * 10000 * 1.02^2 = 280 908  
      + 1 commande en janvier * 10000 * 1.02^3 = 10 612.08  
      Coût de revient = 1 080 000 + 117 647.06 + 27 000 + 234 600 + 280 908 + 10 612.08 = 1 750 767.14 €  
      Prix contrat = Coût de revient * 1.7 = 2 976 304.138 €  
   Contrat 2 :  
       1000 € le cout horaire, 12h pour fabriquer 1000 boulons, le contrat 2 comporte 30 000 boulons = 12 * 30 * 1 000 = 360 000 €  
       25 commandes en janvier * 10 000 * 1.02^3 = 265 302  
       + 5 commandes en février * 10 000 * 1.02^4 = 54 121.61  
      Coût de revient = 360 000 + 265 302 + 54 121.61 = 679 423.61 €  
      Prix contrat = Coût de revient * 1.7 = 1 155 020.14 €  

4. La question 4 a été effectuée depuis les données calculées par l'ERP. D'après ce dernier les demandes ne sont pas réalsables. Pour pouvoir afficher les dates de commandes, nous avons mis la date de lancement de la  
   commande au 1er septembre 1969.  

Projet réalisé par Sabrina BOUROUIS, Alexis HEIL, Maroua KERKOUB et Amélie WARTH.   
