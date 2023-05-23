pipeline {
    agent any

    environment {        
        DOCKERHUB_CREDENTIALS = credentials ('bouhmiid-dockerhub')
        SONAR_HOST_URL = "http://192.168.1.105:9000"

        NEXUS_VERSION = "nexus3"
        NEXUS_PROTOCOL = "http"
        NEXUS_URL = "http://192.168.1.105:8081"
        NEXUS_REPOSITORY = "raw-repo"
        NEXUS_CREDENTIAL_ID = "nexustanitlab"
    }

    stages {

        stage('CheckoutGit') {   //Récupération du code source
            steps {
                echo 'checking GitHub Repo'
                git branch: 'main',
                url: 'https://github.com/ahmedouertani/easybb.git'
            }
        }

        stage('UseNode.js') { //Installation de Node.JS
            steps {
                script {
                    nodejs = tool 'nodejs-16'
                    env.PATH = "${nodejs}/bin:${env.PATH}"
                }
            }
        }

        stage('InstallDependencies') { //Installer les dépendances du projet
            steps {
                sh 'npm install'
            }
        }

        /*stage('ExcuteSonarQubeReport') { //Installer les dépendances du projet
            steps {
                //nodejs(nodeJSInstallationName: 'nodejs-14'){
                sh 'npm run sonar'
            }
        }*/

        stage('Build') {
            steps {    
                sh 'ng build'
                }
                }

stage('UploadArtifactNexus') {
    steps {
        // Reste des étapes de déploiement des artefacts
        sh 'npm config set registry http://192.168.1.105:8081'
        sh 'npm install'
        sh 'npm run build'

        // Déployer l'artefact sur Nexus
        sh 'curl -v -u admin:bouhmidenaey97 --upload-file my-artifact.jar http://192.168.1.105:8081/repository/raw-repo/my-artifact.jar'
    }
}









        /*stage('BuildDockerImage') {
            steps {
                script {
                    def dockerImage = docker.build('bouhmiid/easybq', '.')
                }
            }
        }

        stage ('loginDockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('PushDocker') {
            steps {
               sh 'docker push bouhmiid/easybq:latest'
               }
               }

        stage('RunDockerContainer') {
            steps {
                script {
                    docker.image('bouhmiid/easybq').run('-p 4451:4200')
                }
            }
        }*/
         
        stage('NodeVersion') {
            steps {
                sh'node -v' }
                }

                }
    
    post {
        success {
            echo 'Success'
        }
        failure {
            echo 'Failure'
        }
    }
}
