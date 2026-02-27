pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Pas besoin de checkout scm, on va dans un dossier avec permissions
                dir('auth-service') {
                    git url: 'https://github.com/Yassin-abdennadher/auth-service-pfe.git', branch: 'master'
                }
            }
        }
        
        stage('Install') {
            steps {
                dir('auth-service') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build') {
            steps {
                dir('auth-service') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                dir('auth-service') {
                    sh 'docker build -t auth-service .'
                }
            }
        }
        
        stage('Deploy') {
            when { branch 'master' }
            steps {
                sh '''
                    docker stop auth-service || true
                    docker rm auth-service || true
                    docker run -d --name auth-service --network gmao-network -p 4001:4001 auth-service
                '''
            }
        }
    }
}