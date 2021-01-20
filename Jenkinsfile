pipeline {
    agent any

    environment {
        HOME = '.'

        dockerImage = ''
    }

    stages {
        stage('Build Backend') {
            steps {

                dir('app') {
                    script {
                        dockerImage = docker.build 'nest_app'

                    }
                }
            }
        }
    }
}
