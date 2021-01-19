pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {
        stage('preparation') {

            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                sh '''
                   node --version
                   npm --version
                   '''
            }
        }

        stage('install BE packages') {

            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

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
