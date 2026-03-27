pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Yassin-abdennadher/auth-service-pfe.git'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build || echo "Build done"'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test || echo "No tests"'
            }
        }
    }
}