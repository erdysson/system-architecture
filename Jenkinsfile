pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {

        stage('Start Nginx') {
            agent {
                docker {
                    image 'nginxinc/nginx-unprivileged'
                    args '-v /usr/local/etc/nginx/ -c /usr/local/etc/nginx/'
                }
            }

            steps {
                sh '''
                    nginx
                    curl https://localhost/
                    echo "started nginx and will stop now"
                    nginx -s stop
                   '''
            }
        }

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
