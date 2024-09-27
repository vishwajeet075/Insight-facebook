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
          

               // Automatically merge feature branch into main branch after successful build
            script {
                if (env.BRANCH_NAME.startsWith('feature/')) {
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        sh """
                            # Checkout the main branch
                            git checkout main

                            # Pull the latest changes from main
                            git pull https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/your-repo-url.git main

                            # Merge the feature branch into main
                            git merge ${env.BRANCH_NAME}

                            # Push the updated main branch back to GitHub
                            git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/your-repo-url.git main
                        """
                    }
                }
            }
        }
        
        failure {
            echo 'Build failed'
           
        }
    }
}
