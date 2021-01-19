pipeline {
    agent {
        docker {
            image 'node:latest'
        }
    }

    environment {
        HOME = '.'
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

        stage('build BE') {
            steps {
                sh '''
                    cd app
                    npm run build
                   '''
            }
        }

        stage('install FE packages') {
            steps {
                sh '''
                    cd app-frontend
                    npm install
                   '''
            }
        }

        stage('build FE') {
            steps {
                sh '''
                    cd app-frontend
                    npm run build
                   '''
            }
        }

        stage('install TEST packages') {
            steps {
                sh '''
                    cd app-test
                    npm install
                   '''
            }
        }
    }
}
