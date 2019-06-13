# API RESTfull - POMMADAM - PPE2
* Prérequis
* Installation
* Utilisation
## Prérequis
Sur Debian 9
### GIT
    sudo apt install git
### NodeJs
    sudo curl -sL https://deb.nodesource.com/setup_12.x | bash -
    sudo apt install -y nodejs
### MongoDb
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

    echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/4.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

    sudo apt-get update

    sudo apt-get install -y mongodb-org
## Installation
Dans le dossier `Home` faire:
    
    git clone https://github.com/N4n3x/ppe2Api.git
    cd ppe2Api
    npm install
Pour importer les données dans MongoDb:

    mongoimport --db ppe5 --file /path/to/data/fileExport.json
## Utilisation

Une fois Postman installé, le fichier `ppe2 0.2.postman_collection.json` permet l'import de l'environnement de test dans postman.
