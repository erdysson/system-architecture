pipeline {

    agent {

        docker {
            image 'node:14-alpine'
        }
    }

    stages {
        stage('preparation') {
            steps {
                sh '''
                   node --version
                   npm --version
                   '''
            }
        }

        stage('install BE packages') {
            steps {
                sh '''
                    cd app
                    npm install
                   '''
            }
        }
    }
}
