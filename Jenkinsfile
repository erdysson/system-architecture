pipeline {

    agent {
        docker {
            image 'node:14-alpine',
            label 'default-docker'
            args '''
                -e PATH=/usr/local/bin
            '''
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
