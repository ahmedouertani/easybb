pipeline {
    agent any

    environment {        
        DOCKERHUB_CREDENTIALS = credentials ('bouhmiid-dockerhub')
        SONAR_HOST_URL = "http://192.168.1.207:9000"

        NEXUS_VERSION = "nexus3"
        NEXUS_PROTOCOL = "http"
        NEXUS_URL = "http://192.168.1.207:8081"
        NEXUS_REPOSITORY = "maven-central-repository"
        NEXUS_CREDENTIAL_ID = "NEXUS_CRED"
    }

    stages {

        stage('Checkout Git') {   //Récupération du code source
            steps {
                echo 'checking GitHub Repo'
                git branch: 'main',
                url: 'https://github.com/ahmedouertani/Easyb.git'
            }
        }

        stage('Use Node.js') { //Installation de Node.JS
            steps {
                script {
                    nodejs = tool 'nodejs-16'
                    env.PATH = "${nodejs}/bin:${env.PATH}"
                }
            }
        }

        stage('Install dependencies') { //Installer les dépendances du projet
            steps {
                sh 'npm install'
            }
        }

                stage('ExcuteSonarQubeReport') { //Installer les dépendances du projet
            steps {
                //nodejs(nodeJSInstallationName: 'nodejs-14'){
                sh 'npm run sonar'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build('bouhmiid/easybq', '.')
                }
            }
        }

        stage ('login to dockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push') {
            steps {
               sh 'docker push bouhmiid/easybq:latest'
               }
               }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image('bouhmiid/easybq').run('-p 4489:4200')
                }
            }
        }
/*
stage('Publish to Nexus Repository Manager') {
    steps {
        script {
            def packageVersion = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
            def artifactPath = "dist/*.tar.gz"

            nexusArtifactUploader(
                nexusVersion: 'nexus3',
                protocol: 'http',
                nexusUrl: 'http://192.168.1.207:8081',
                groupId: 'com.example',
                version: packageVersion,
                repository: 'maven-central-repository',
                credentialsId: 'NEXUS_CRED',
                artifacts: [
                    [artifactId: 'easyb',
                    classifier: '',
                    file: artifactPath,
                    type: 'tar.gz']
                ]
            )
        }
    }
}*/       
stage('Node version') {
    steps {
        sh'node -v' }
    }
stage('Testing Stage') {
    steps {
        sh 'cd bqq && npm install && npm install korma-sonarqube-unit-reporter && ng test --watch=false --code-coverage'
    }
}

    stage('sonar scan stage') {
    steps {
        sh 'npm run sonar'
        }
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
