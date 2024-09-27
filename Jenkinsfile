pipeline {
    agent any
    tools {
        nodejs "nodejs_lts"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Node and npm version') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
