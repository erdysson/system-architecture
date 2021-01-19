pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {

        stage('Build BE') {
            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                sh '''
                    cd app
                    npm install
                    npm run build
                   '''
            }
        }

        stage('Build FE') {
            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                sh '''
                    cd app-frontend
                    npm install
                    npm run build
                   '''
            }
        }

        stage('Start System') {
            agent {
                docker {
                    image 'nginx'
                }
            }

            steps {
                sh '''
                    nginx
                    echo "started nginx and will stop now"
                    nginx -s stop
                   '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                sh '''
                    cd app-test
                    npm install
                   '''
            }
        }
    }
}
