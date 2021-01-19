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
                            npm run build
                           '''
                    }
                }
    }
}
