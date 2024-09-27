pipeline {
    agent any
    tools {
        nodejs "nodejs_lts"  // The name you provided in the configuration
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
         stage('Install Dependencies') {
            steps {
                script {
                    // Make sure Node.js and npm are available
                    sh 'node -v'
                    sh 'npm -v'
                }
                sh 'npm install'
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
            echo 'Build succeeded'
            githubNotify status: 'SUCCESS', description: 'Build succeeded'
        }
        failure {
            echo 'Build failed'
            githubNotify status: 'FAILURE', description: 'Build failed'
        }
    }
}
