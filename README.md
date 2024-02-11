### Clone repository
```git clone https://github.com/Eyobalex/Addis-Software-Test-Project.git```

### Build and Run project

  ## Using Docker
   - ```docker compose build```
   - ```docker compose up```

  ## Without docker
   - ```cd Addis-Software-Test-project```
   - ```cd server```
   - ```cp .env.example .env```
   - setup the env with the correct mongodb url
   - ```npm install```
   - ```npm start```
   - open another terminal on project root
   - ```cd client```
   - ```cp .env.example .env```
   - ```npm install```
   - ```npm start```
