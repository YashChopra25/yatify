# This is underDevelopement for the Dockerizations

# Yatify-this is an chat app
## This is being developed using **React**,**Express**,**MongoDB**,**Docker** and **kafka** and **RabbitMQ**

> This is project is for the fun and learn.
>
# Installation Step
> # Step 1: Getting Source Code
>Clone the repo [Yatify](https://github.com/YashChopra25/yatify),then follow the next steps
>
> #  Step 2: Add the Environment variable to the App
>
> * Go to the root folder
>    * create an environment file using this command `cp sample.env .env` change the environment values accoding to the requirements
> 
> * Go to the client folder using this command `cd client`
>    * create an environment file using this command `cp sample.env .env` change the environment values accoding to the requirements
>
>* **Open an new terminal in your IDE/ Use the command to go back in the terminal `cd ..`**
> * Go to the server folder using this command `cd server`
>    * create an environment file using this command `cp sample.env .env` change the environment values accoding to the requirements
>
># Step 3:
> ## Method 1: Without Docker
> * Go to the client folder using this command `cd client`
> 
>    * install the dependency using this command `npm i`
>    * Run  the server using this command `npm run dev`
>* **Open an new terminal in your IDE**
> * Go to the server folder using this command `cd server`
>    * install the dependency using this command `npm i`
>    * Run  the server using this command `npm run dev`
>
>>Open the browser and open this url: [Link](http://localhost:5173)
> Backend is running on the PORT 8000
>## Method 2: With Docker
> * Go to root directory
>
>  *Note:**Docker** must be install in your system and is should be in running state*
>## Download [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)
>For verifying the docker is running or not use this command in your terminal `docker ps`
>
>* Open terminall in the root directory run this command `docker compose up` use this flag for using in the detached mode `-d` with the command
>
>
>The above command file read the Docker file located in the server and client folder and then pull the image for the first time if exist else it will used the previous image,then run the server on that port.
>
>***Note** :This can take a bit longer as its depends on the network speed*
>
>Open the browser and open this url: [Link](http://localhost:5173)
>
> Backend is running on the PORT 8000
>

