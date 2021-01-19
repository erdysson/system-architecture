pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {

        stage('Start Nginx') {
            agent {
                docker {
                    image 'nginx'
                }
            }

            steps {
                sh '''
                    mkdir -p /var/cache/nginx
                    chown nginx:nginx /var/cache/nginx
                    nginx
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
