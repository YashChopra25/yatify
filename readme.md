# This is under development for the RabbitMQ

# Yatify-this is a chat app
## This is being developed using **React**,**Express**,**MongoDB**,**Docker** and **Kafka**/ **RabbitMQ**

> This project consist mainly three branches:
> * **main** Branch: This consist the source code the server and client
> * **with-docker-only** Branch: This consist the source code the server and client with the docker
> * **with-kafka-using-docker** Branch: This consist the source code the server and client with the docker using the **Kafka**

>

# Installation Step
> # Step 1: Getting Source Code
>Clone the repo [Yatify](https://github.com/YashChopra25/yatify),then follow the next steps
>
> #  Step 2: Add the Environment variable to the App
>
> * Go to the root folder
>    * create an environment file using this command `cp sample.env .env` to change the environment values according to the requirements
> 
> * Go to the client folder using this command `cd client`
>    * create an environment file using this command `cp sample.env .env` to change the environment values according to the requirements
>
>* **Open a new terminal in your IDE/ Use the command to go back to the terminal `cd ..`**
> * Go to the server folder using this command `cd server`
>    * create an environment file using this command `cp sample.env .env` to change the environment values according to the requirements
>
># Step 3:
>
>## Method 1: With Docker
> * Go to the root directory
>
>  *Note:**Docker** must be installed in your system and it should be in the running state*
>## Download [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)
>For verifying whether the docker is running or not use this command in your terminal `docker ps`
>
>* Open the terminal in the root directory and run this command `docker compose up --build` use this flag for use in the detached mode `-d` with the command
>TO close the container  run this command `docker compose down`
>
>
>The above command file read the Docker file located in the server and client folder and then pull the image for the first time if exist else it will used the previous image,then run the server on that port.
>
>***Note**: This can take a bit longer as it depends on the network speed*
> ## Method 2: Without Docker
> * Go to the client folder using this command `cd client`
> 
>    * install the dependency using this command `npm i`
>    * Run  the server using this command `npm run dev`
>* **Open an new terminal in your IDE**
> * Go to the server folder using this command `cd server`
>    * install the dependency using this command `npm i`
>    * Run  the server using this command `npm run dev`
>
>>Open the browser and open this URL: [Link](http://localhost:5173)
> The backend is running on the PORT 8000
>Open the browser and open this URL: [Link](http://localhost:5173)
>
> The backend is running on the PORT 8000
>

