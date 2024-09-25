pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/your-repo-url.git', branch: 'main'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm install'
                sh 'npm test' // Ensure you have tests in your project
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Netlify') {
            when {
                branch 'main' // Deploy only from the main branch
            }
            steps {
                withCredentials([string(credentialsId: 'NETLIFY_AUTH_TOKEN', variable: 'NETLIFY_TOKEN')]) {
                    sh 'netlify deploy --prod --dir=dist' // Replace 'dist' with your build directory
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
            mail to: 'your-email@example.com',
                 subject: "Deployment to Netlify: SUCCESS",
                 body: "The project has been successfully deployed to Netlify."
        }

        failure {
            echo 'Deployment failed!'
            mail to: 'your-email@example.com',
                 subject: "Deployment to Netlify: FAILURE",
                 body: "There was an issue with the deployment. Please check the logs."
        }
    }
}
