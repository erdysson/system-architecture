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
                        dockerImage = docker.build('nest_app', '--no-cache .')

                    }
                }
            }
        }
        
        stage('Build Frontend') {
            steps {

                dir('app-frontend') {
                    script {
                        dockerImage = docker.build('angular_app', '--no-cache .')

                    }
                }
            }
        }
    }
}
