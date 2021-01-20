pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {
        stage('Build Backend') {
            agent {
                dockerfile {
                    dir 'app'
                    additionalBuildArgs  '-t nest_app'
                }
            }

            steps {
                sh '''
                    npm --version
                '''
            }
        }
    }
}
