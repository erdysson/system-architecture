pipeline {

    agent {
        docker {
            def PATH = '/usr/local/bin'
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
