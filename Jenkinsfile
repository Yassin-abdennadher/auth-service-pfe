pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            label 'docker'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
        stage('Test') {
            steps {
                sh 'npm test || echo "No tests found"'
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
                script {
                    sh '''
                        docker stop auth-service || true
                        docker rm auth-service || true
                        docker run -d --name auth-service --network gmao-network -p 4001:4001 auth-service
                    '''
                }
            }
        }
    }
}