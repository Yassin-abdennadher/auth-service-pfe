pipeline {
    agent any  // ← Pas de docker
    
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Yassin-abdennadher/auth-service-pfe.git', branch: 'master'
            }
        }
        
        stage('Install') {
            steps {
                sh 'npm install || echo "npm not installed"'
            }
        }
        
        // Pour l'instant, on skip le build Docker
    }
}