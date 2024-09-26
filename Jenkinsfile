pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy to GitHub') {
            when {
                expression { 
                    return env.BRANCH_NAME.startsWith('feature/') 
                }
            }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        sh """
                            git config user.email "jenkins@example.com"
                            git config user.name "Jenkins"
                            git add .
                            git commit -m "Build artifacts from Jenkins"
                            git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/your-repo-url.git HEAD:${env.BRANCH_NAME}
                        """
                    }
                }
            }
        }
    }
    post {
        success {
            githubNotify status: 'SUCCESS', description: 'Build succeeded'
        }
        failure {
            githubNotify status: 'FAILURE', description: 'Build failed'
        }
    }
}