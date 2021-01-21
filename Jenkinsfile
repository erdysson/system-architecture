pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {
        stage('Build Backend') {

            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                dir('app') {
                    script {
                        sh('./build.sh')
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('app') {
                    script {
                        docker.build('nest_app', '-f Dockerfile .')
                    }
                }
           }
        }

        stage('Build Frontend') {
            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                dir ('app-frontend') {
                    script {
                        sh('./build.sh')
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('app-frontend') {
                    script {
                        docker.build('angular_app', '-f Dockerfile .')
                    }
                }
           }
        }
    }
}
