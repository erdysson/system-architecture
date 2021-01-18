pipeline {

    environment {
        PATH = '/usr/local/bin'
    }

    agent {

        docker {
            image 'node:14-alpine'
        }
    }

    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
