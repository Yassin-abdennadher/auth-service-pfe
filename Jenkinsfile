pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Yassin-abdennadher/auth-service-pfe.git', branch: 'master'
            }
        }
        
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Docker Build') {
            steps {
                sh 'docker build -t auth-service .'
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