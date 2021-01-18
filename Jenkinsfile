pipeline {

    agent {
        label 'docker'
    }

    stages {
        stage('docker node test') {
            agent {
                docker {
                    // Set both label and image
                    label 'docker'
                    image 'node:14-alpine'
                    args '--name docker-node' // list any args
               }
            }

            steps {
                sh 'npm --version'
            }
        }
    }
}
