pipeline {

    agent {

        environment {
            PATH = '/usr/local/bin'
        }

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
