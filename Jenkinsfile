pipeline {

    agent {
        label 'docker'
    }

    stages {

        agent {
            docker {
                // Set both label and image
                label 'docker'
                image 'node:14-alpine'
                args '--name docker-node' // list any args
           }
        }

        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
