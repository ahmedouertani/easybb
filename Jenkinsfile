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

                stage('NodeVersion') {
            steps {
                sh'node -v' }
                }

       /* stage('ExcuteSonarQubeReport') { //Installer les dépendances du projet
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

stage('UploadArtifactNexusRAW') {
    steps {
        // Reste des étapes de déploiement des artefacts
        sh 'npm config set registry http://192.168.1.105:8081'
        sh 'npm install'
        sh 'npm run build'

        // Déployer l'artefact sur Nexus
        sh 'curl -v -u admin:bouhmidenaey97 --upload-file dist/TanitLab/* http://192.168.1.105:8081/repository/raw-repo/'
    }
}

stage('DeploytoNexus 2') {
  steps {
    nexusUpload(
      nexusInstanceId: 'nexustanitlab', // Remplacez 'nexus-instance' par l'ID de votre instance Nexus dans Jenkins
      protocol: 'http', // Remplacez par le protocole approprié (http ou https)
      repository: 'raw-repo', // Remplacez par le nom de votre repository Nexus
      groupId: 'com.example', // Remplacez par le groupId approprié pour votre projet
      version: '1.0.0', // Remplacez par la version appropriée de votre projet
      file: 'tanitlab-1.0.0.tgz' // Remplacez par le chemin absolu vers votre fichier "tanitlab-1.0.0.tgz"
    )
  }
}

/*stage('UploadArtifactNexusNPM') {
    steps {
        // Reste des étapes de déploiement des artefacts
        sh 'npm config set registry http://192.168.1.105:8081'
        sh 'npm install'
        sh 'npm run build'

        // Déployer l'artefact sur Nexus
        sh 'curl -v -u admin:bouhmidenaey97 --upload-file dist/TanitLab/* http://192.168.1.105:8081/repository/npm-repo/'
    }
}*/


      /* stage('BuildDockerImage') {
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
                    docker.image('bouhmiid/easybq').run('-p 1212:4200')
                }
            }
        }

        stage ('security scan') {
            steps {
                echo ("Perform a security scan using OWASP ZAB")

            }
         post {
            success { 
                emailext attachLog: true,
                    body: 'Scan was successful',
                    subject: 'Scan status email',
                    to: 'ahmed.ouertani.2@esprit.tn'
            }

            failure { 
                emailext attachLog: true,
                    body: 'Scan was Failed',
                    subject: 'Scan status email',
                    to: 'ahmed.ouertani.2@esprit.tn'
            }
         }}*/


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
